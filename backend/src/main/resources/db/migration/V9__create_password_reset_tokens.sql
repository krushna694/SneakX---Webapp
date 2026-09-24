-- ==========================================
-- SneakX V9 - Password Reset Tokens
-- ==========================================
CREATE TABLE password_reset_tokens (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    reset_token_hash VARCHAR(255),
    otp_expires_at TIMESTAMP NOT NULL,
    reset_token_expires_at TIMESTAMP NULL,
    otp_verified BOOLEAN NOT NULL DEFAULT FALSE,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    attempts INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_password_reset_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_password_reset_user_id (user_id),
    INDEX idx_password_reset_expires (otp_expires_at),
    INDEX idx_password_reset_token_expires (reset_token_expires_at),
    INDEX idx_password_reset_used (used)
) ENGINE = InnoDB;