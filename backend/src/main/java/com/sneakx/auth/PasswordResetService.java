package com.sneakx.auth;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

@Service
public class PasswordResetService {

        private static final int OTP_LENGTH = 6;

        private static final int MAX_OTP_ATTEMPTS = 5;

        private final UserRepository userRepository;

        private final PasswordResetTokenRepository passwordResetTokenRepository;

        private final PasswordEncoder passwordEncoder;

        private final SecureRandom secureRandom = new SecureRandom();

        @Value("${otp.log-console:false}")
        private boolean otpLogConsole;

        @Value("${otp.expiration-minutes:10}")
        private long otpExpirationMinutes;

        @Value("${password-reset.token-expiration-minutes:10}")
        private long resetTokenExpirationMinutes;

        public PasswordResetService(
                        UserRepository userRepository,
                        PasswordResetTokenRepository passwordResetTokenRepository,
                        PasswordEncoder passwordEncoder) {
                this.userRepository = userRepository;

                this.passwordResetTokenRepository = passwordResetTokenRepository;

                this.passwordEncoder = passwordEncoder;
        }

        /**
         * Requests a password reset OTP.
         *
         * Security note:
         * The method intentionally returns the same
         * response whether or not the email exists.
         */
        @Transactional
        public void requestPasswordReset(
                        String email) {

                String normalizedEmail = normalizeEmail(email);

                User user = userRepository
                                .findByEmail(normalizedEmail)
                                .orElse(null);

                if (user == null || !user.isActive()) {
                        return;
                }

                /*
                 * Invalidate all previous reset sessions
                 * before creating a new one.
                 */
                passwordResetTokenRepository
                                .invalidateActiveTokens(user.getId());

                String otp = generateOtp();

                PasswordResetToken resetToken = new PasswordResetToken();

                resetToken.setUser(user);

                /*
                 * Store only the BCrypt hash of the OTP.
                 */
                resetToken.setOtpHash(
                                passwordEncoder.encode(otp));

                resetToken.setOtpExpiresAt(
                                LocalDateTime.now()
                                                .plusMinutes(
                                                                otpExpirationMinutes));

                resetToken.setOtpVerified(false);

                resetToken.setUsed(false);

                resetToken.setAttempts(0);

                passwordResetTokenRepository.save(
                                resetToken);

                /*
                 * Development-only OTP logging.
                 *
                 * Never enable this in production.
                 */
                if (otpLogConsole) {
                        System.out.println(
                                        "================================================");

                        System.out.println(
                                        "SneakX PASSWORD RESET OTP");

                        System.out.println(
                                        "Email: " + normalizedEmail);

                        System.out.println(
                                        "OTP: " + otp);

                        System.out.println(
                                        "Expires in: "
                                                        + otpExpirationMinutes
                                                        + " minutes");

                        System.out.println(
                                        "================================================");
                }
        }

        /**
         * Verifies the OTP and returns a temporary
         * password-reset token.
         */
        @Transactional
        public String verifyResetOtp(
                        String email,
                        String otp) {

                String normalizedEmail = normalizeEmail(email);

                User user = userRepository
                                .findByEmail(normalizedEmail)
                                .orElseThrow(
                                                () -> new IllegalArgumentException(
                                                                "Invalid or expired OTP"));

                PasswordResetToken resetToken = passwordResetTokenRepository
                                .findTopByUserIdAndUsedFalseOrderByCreatedAtDesc(
                                                user.getId())
                                .orElseThrow(
                                                () -> new IllegalArgumentException(
                                                                "Invalid or expired OTP"));

                LocalDateTime now = LocalDateTime.now();

                if (resetToken.isUsed()
                                || resetToken.isOtpVerified()
                                || resetToken
                                                .getOtpExpiresAt()
                                                .isBefore(now)) {
                        throw new IllegalArgumentException(
                                        "Invalid or expired OTP");
                }

                if (resetToken.getAttempts() >= MAX_OTP_ATTEMPTS) {
                        throw new IllegalArgumentException(
                                        "Too many OTP attempts. Please request a new OTP.");
                }

                boolean validOtp = passwordEncoder.matches(
                                otp,
                                resetToken.getOtpHash());

                if (!validOtp) {

                        resetToken.incrementAttempts();

                        passwordResetTokenRepository.save(
                                        resetToken);

                        int remainingAttempts = MAX_OTP_ATTEMPTS
                                        - resetToken.getAttempts();

                        if (remainingAttempts <= 0) {
                                throw new IllegalArgumentException(
                                                "Too many OTP attempts. Please request a new OTP.");
                        }

                        throw new IllegalArgumentException(
                                        "Invalid OTP. "
                                                        + remainingAttempts
                                                        + " attempts remaining.");
                }

                /*
                 * Generate a cryptographically random
                 * temporary reset token.
                 */
                String rawResetToken = generateResetToken();

                /*
                 * Store only a SHA-256 hash in MySQL.
                 */
                resetToken.setResetTokenHash(
                                hashToken(rawResetToken));

                resetToken.setResetTokenExpiresAt(
                                LocalDateTime.now()
                                                .plusMinutes(
                                                                resetTokenExpirationMinutes));

                resetToken.setOtpVerified(true);

                passwordResetTokenRepository.save(
                                resetToken);

                /*
                 * Return the raw token only once.
                 * The frontend stores it temporarily in
                 * sessionStorage.
                 */
                return rawResetToken;
        }

        /**
         * Resets the user's password.
         */
        @Transactional
        public void resetPassword(
                        String rawResetToken,
                        String newPassword) {

                if (rawResetToken == null
                                || rawResetToken.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Reset token is required");
                }

                String resetTokenHash = hashToken(rawResetToken);

                PasswordResetToken resetToken = passwordResetTokenRepository
                                .findTopByResetTokenHashAndUsedFalse(
                                                resetTokenHash)
                                .orElseThrow(
                                                () -> new IllegalArgumentException(
                                                                "Invalid or expired reset token"));

                LocalDateTime now = LocalDateTime.now();

                if (!resetToken.isOtpVerified()
                                || resetToken.isUsed()
                                || resetToken
                                                .getResetTokenExpiresAt() == null
                                || resetToken
                                                .getResetTokenExpiresAt()
                                                .isBefore(now)) {
                        throw new IllegalArgumentException(
                                        "Invalid or expired reset token");
                }

                User user = resetToken.getUser();

                if (user == null || !user.isActive()) {
                        throw new IllegalArgumentException(
                                        "Invalid or expired reset token");
                }

                /*
                 * BCrypt hash the new password.
                 */
                user.setPassword(
                                passwordEncoder.encode(newPassword));

                userRepository.save(user);

                /*
                 * Make the reset token single-use.
                 */
                resetToken.setUsed(true);

                passwordResetTokenRepository.save(
                                resetToken);
        }

        /**
         * Generates a cryptographically secure
         * six-digit OTP.
         */
        private String generateOtp() {

                int minimum = 100000;

                int maximum = 1000000;

                int otp = secureRandom.nextInt(
                                maximum - minimum) + minimum;

                return String.valueOf(otp);
        }

        /**
         * Generates a strong temporary reset token.
         */
        private String generateResetToken() {

                return UUID.randomUUID()
                                .toString()
                                + "-"
                                + UUID.randomUUID()
                                                .toString();
        }

        /**
         * SHA-256 hash used for reset-token lookup.
         */
        private String hashToken(String token) {

                try {

                        MessageDigest digest = MessageDigest.getInstance(
                                        "SHA-256");

                        byte[] hash = digest.digest(
                                        token.getBytes(
                                                        StandardCharsets.UTF_8));

                        return HexFormat.of()
                                        .formatHex(hash);

                } catch (NoSuchAlgorithmException exception) {

                        throw new IllegalStateException(
                                        "SHA-256 algorithm is not available",
                                        exception);
                }
        }

        private String normalizeEmail(
                        String email) {

                if (email == null
                                || email.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Email is required");
                }

                return email
                                .trim()
                                .toLowerCase();
        }
}