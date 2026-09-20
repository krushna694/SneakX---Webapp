package com.sneakx.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(
            PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // --------------------------------------------------
    // CREATE PAYMENT
    // --------------------------------------------------

    @PostMapping("/orders/{orderId}")
    public ResponseEntity<PaymentResponse> createPayment(
            @PathVariable Long orderId,

            @RequestParam @NotNull PaymentMethod paymentMethod,

            @RequestHeader("Idempotency-Key") @NotBlank String idempotencyKey,

            Authentication authentication) {

        PaymentResponse response = paymentService.createPayment(
                orderId,
                paymentMethod,
                idempotencyKey,
                authentication);

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------
    // GET PAYMENT
    // --------------------------------------------------

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<PaymentResponse> getPayment(
            @PathVariable Long orderId,
            Authentication authentication) {

        PaymentResponse response = paymentService.getPayment(
                orderId,
                authentication);

        return ResponseEntity.ok(response);
    }
}