package com.sneakx.auth;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

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
    private final PasswordResetTokenRepository resetTokenRepository;
    private final PasswordEncoder passwordEncoder;

    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${otp.log.console:false}")
    private boolean otpLogConsole;

    @Value("${otp.expiration-minutes:10}")
    private long otpExpirationMinutes;

    @Value("${password-reset.token-expiration-minutes:10}")
    private long resetTokenExpirationMinutes;

    public PasswordResetService(
            UserRepository userRepository,
            PasswordResetTokenRepository resetTokenRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.resetTokenRepository = resetTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void requestPasswordReset(String email) {

        String normalizedEmail = normalizeEmail(email);

        /*
         * Always return successfully from the controller.
         * This prevents account enumeration through the forgot-password API.
         */
        User user = userRepository.findByEmail(normalizedEmail)
                .orElse(null);

        if (user == null || !user.isActive()) {
            return;
        }

        // Remove previous reset requests for this user.
        resetTokenRepository.deleteByUserId(user.getId());

        String otp = generateOtp();

        PasswordResetToken resetToken = new PasswordResetToken();

        resetToken.setUser(user);
        resetToken.setOtpHash(passwordEncoder.encode(otp));
        resetToken.setOtpExpiresAt(
                LocalDateTime.now().plusMinutes(otpExpirationMinutes));

        resetTokenRepository.save(resetToken);

        /*
         * Development-only OTP output.
         *
         * Production should use an email provider.
         */
        if (otpLogConsole) {
            System.out.println(
                    "[SNEAKX DEV OTP] Password reset OTP for "
                            + normalizedEmail
                            + " = "
                            + otp);
        }
    }

    @Transactional
    public String verifyOtp(
            String email,
            String otp) {

        String normalizedEmail = normalizeEmail(email);

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid or expired OTP"));

        PasswordResetToken resetToken = resetTokenRepository
                .findTopByUserIdAndUsedFalseOrderByCreatedAtDesc(
                        user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid or expired OTP"));

        if (resetToken.isOtpVerified()) {
            throw new IllegalArgumentException(
                    "OTP has already been verified");
        }

        if (resetToken.getOtpExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new IllegalArgumentException(
                    "OTP has expired");
        }

        if (resetToken.getAttempts() >= MAX_OTP_ATTEMPTS) {
            throw new IllegalArgumentException(
                    "Too many invalid OTP attempts");
        }

        if (!passwordEncoder.matches(
                otp,
                resetToken.getOtpHash())) {

            resetToken.incrementAttempts();
            resetTokenRepository.save(resetToken);

            throw new IllegalArgumentException(
                    "Invalid or expired OTP");
        }

        String resetTokenValue = generateResetToken();

        resetToken.setOtpVerified(true);

        resetToken.setResetTokenHash(
                passwordEncoder.encode(resetTokenValue));

        resetToken.setResetTokenExpiresAt(
                LocalDateTime.now()
                        .plusMinutes(resetTokenExpirationMinutes));

        resetTokenRepository.save(resetToken);

        return resetTokenValue;
    }

    @Transactional
    public void resetPassword(
            String resetTokenValue,
            String newPassword) {

        if (resetTokenValue == null
                || resetTokenValue.isBlank()) {

            throw new IllegalArgumentException(
                    "Reset token is required");
        }

        /*
         * Reset tokens are stored hashed, so we cannot directly
         * query by the raw token.
         *
         * We therefore inspect active reset records and verify
         * the token using BCrypt.
         */
        PasswordResetToken matchingToken = resetTokenRepository
                .findAll()
                .stream()
                .filter(token -> !token.isUsed()
                        && token.isOtpVerified()
                        && token.getResetTokenHash() != null
                        && token.getResetTokenExpiresAt() != null
                        && token.getResetTokenExpiresAt()
                                .isAfter(LocalDateTime.now())
                        && passwordEncoder.matches(
                                resetTokenValue,
                                token.getResetTokenHash()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid or expired reset token"));

        User user = matchingToken.getUser();

        if (!user.isActive()) {
            throw new IllegalArgumentException(
                    "Account is not active");
        }

        user.setPassword(
                passwordEncoder.encode(newPassword));

        userRepository.save(user);

        matchingToken.setUsed(true);
        matchingToken.setResetTokenHash(null);

        resetTokenRepository.save(matchingToken);
    }

    private String normalizeEmail(String email) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException(
                    "Email is required");
        }

        return email.trim().toLowerCase();
    }

    private String generateOtp() {

        int minimum = (int) Math.pow(10, OTP_LENGTH - 1);
        int maximum = (int) Math.pow(10, OTP_LENGTH) - 1;

        int otp = secureRandom.nextInt(
                maximum - minimum + 1) + minimum;

        return String.valueOf(otp);
    }

    private String generateResetToken() {

        byte[] bytes = new byte[48];

        secureRandom.nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }
}