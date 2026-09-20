package com.sneakx.payment;

import jakarta.validation.constraints.NotBlank;

public record PaymentVerificationRequest(

        @NotBlank String razorpayPaymentId,

        @NotBlank String razorpayOrderId,

        @NotBlank String razorpaySignature) {
}