CREATE TABLE payments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    provider VARCHAR(50),
    provider_order_id VARCHAR(255),
    provider_payment_id VARCHAR(255),
    provider_signature VARCHAR(500),
    idempotency_key VARCHAR(100),
    failure_reason VARCHAR(500),
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_payments_order UNIQUE (order_id),
    CONSTRAINT uk_payments_idempotency_key UNIQUE (idempotency_key),
    CONSTRAINT uk_payments_provider_payment_id UNIQUE (provider_payment_id),
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_payments_amount CHECK (amount >= 0),
    CONSTRAINT chk_payments_method CHECK (
        payment_method IN (
            'RAZORPAY',
            'COD'
        )
    ),
    CONSTRAINT chk_payments_status CHECK (
        status IN (
            'PENDING',
            'PROCESSING',
            'SUCCESS',
            'FAILED',
            'CANCELLED',
            'REFUNDED',
            'PARTIALLY_REFUNDED'
        )
    ),
    INDEX idx_payments_order (order_id),
    INDEX idx_payments_status (status),
    INDEX idx_payments_provider_order_id (provider_order_id),
    INDEX idx_payments_created_at (created_at)
) ENGINE = InnoDB;