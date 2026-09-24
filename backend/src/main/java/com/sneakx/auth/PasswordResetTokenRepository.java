package com.sneakx.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findTopByUserIdAndUsedFalseOrderByCreatedAtDesc(
            Long userId);

    Optional<PasswordResetToken> findByResetTokenHashAndUsedFalse(
            String resetTokenHash);

    void deleteByUserId(Long userId);
}