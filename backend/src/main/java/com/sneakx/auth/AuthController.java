package com.sneakx.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneakx.common.response.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    private final PasswordResetService passwordResetService;

    public AuthController(
            AuthService authService,
            PasswordResetService passwordResetService) {
        this.authService = authService;

        this.passwordResetService = passwordResetService;
    }

    // =========================================
    // REGISTER
    // =========================================

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Registration successful",
                                response));
    }

    // =========================================
    // LOGIN
    // =========================================

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Login successful",
                        response));
    }

    // =========================================
    // FORGOT PASSWORD
    // =========================================

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        passwordResetService
                .requestPasswordReset(
                        request.getEmail());

        /*
         * Intentionally generic.
         *
         * This prevents revealing whether
         * an email belongs to an account.
         */
        return ResponseEntity.ok(
                ApiResponse.success(
                        "If an account exists for this email, a password reset OTP has been sent.",
                        null));
    }

    // =========================================
    // VERIFY RESET OTP
    // =========================================

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<ApiResponse<String>> verifyResetOtp(
            @Valid @RequestBody VerifyResetOtpRequest request) {

        String resetToken = passwordResetService
                .verifyResetOtp(
                        request.getEmail(),
                        request.getOtp());

        return ResponseEntity.ok(
                ApiResponse.success(
                        "OTP verified successfully",
                        resetToken));
    }

    // =========================================
    // RESET PASSWORD
    // =========================================

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        passwordResetService
                .resetPassword(
                        request.getResetToken(),
                        request.getNewPassword());

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Password reset successfully",
                        null));
    }
}