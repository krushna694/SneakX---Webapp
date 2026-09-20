package com.sneakx.payment;

public record RazorpayOrderResponse(
        String razorpayOrderId,
        Long localOrderId,
        String orderNumber,
        Long amount,
        String currency,
        String keyId) {
}