package com.sneakx.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PasswordResetTokenRepository
                extends JpaRepository<PasswordResetToken, Long> {

        Optional<PasswordResetToken> findTopByUserIdAndUsedFalseOrderByCreatedAtDesc(
                        Long userId);

        Optional<PasswordResetToken> findTopByResetTokenHashAndUsedFalse(
                        String resetTokenHash);

        /**
         * Delete all password-reset records belonging
         * to a specific user.
         */
        @Modifying
        @Query("""
                            DELETE FROM PasswordResetToken token
                            WHERE token.user.id = :userId
                        """)
        int deleteByUserId(
                        @Param("userId") Long userId);

        /**
         * Mark all currently active reset sessions
         * for a user as used.
         */
        @Modifying
        @Query("""
                            UPDATE PasswordResetToken token
                            SET token.used = true
                            WHERE token.user.id = :userId
                            AND token.used = false
                        """)
        int invalidateActiveTokens(
                        @Param("userId") Long userId);
}