package com.sneakx.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(
        Long paymentId,
        Long orderId,
        String orderNumber,
        PaymentMethod paymentMethod,
        PaymentStatus status,
        BigDecimal amount,
        String currency,
        String provider,
        String providerOrderId,
        String providerPaymentId,
        String razorpayKeyId,
        String failureReason,
        LocalDateTime paidAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}