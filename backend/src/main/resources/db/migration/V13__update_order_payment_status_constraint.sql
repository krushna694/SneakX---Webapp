ALTER TABLE orders DROP CHECK chk_orders_payment_status;
ALTER TABLE orders
ADD CONSTRAINT chk_orders_payment_status CHECK (
        payment_status IN (
            'PENDING',
            'PROCESSING',
            'SUCCESS',
            'FAILED',
            'CANCELLED',
            'REFUNDED',
            'PARTIALLY_REFUNDED',
            'PAID'
        )
    );