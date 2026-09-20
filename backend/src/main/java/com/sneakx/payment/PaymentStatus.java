package com.sneakx.payment;

public enum PaymentStatus {

    PENDING,

    PROCESSING,

    SUCCESS,

    FAILED,

    CANCELLED,

    REFUNDED,

    PARTIALLY_REFUNDED,

    /*
     * PAID is kept because the Order module
     * already uses this status for the order's
     * payment_status field.
     */
    PAID
}