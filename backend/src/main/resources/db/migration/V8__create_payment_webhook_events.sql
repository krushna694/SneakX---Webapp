CREATE TABLE payment_webhook_events (
    id BIGINT NOT NULL AUTO_INCREMENT,
    event_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255),
    payload JSON NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_payment_webhook_event_id UNIQUE (event_id),
    INDEX idx_payment_webhook_event_type (event_type),
    INDEX idx_payment_webhook_payment_id (payment_id),
    INDEX idx_payment_webhook_order_id (razorpay_order_id),
    INDEX idx_payment_webhook_processed (processed),
    INDEX idx_payment_webhook_created_at (created_at)
) ENGINE = InnoDB;