package com.sneakx.payment;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        private final RazorpayWebhookSignatureService razorpayWebhookSignatureService;
        private final PaymentWebhookService paymentWebhookService;

        public PaymentController(
                        PaymentService paymentService,
                        RazorpayWebhookSignatureService razorpayWebhookSignatureService,
                        PaymentWebhookService paymentWebhookService) {

                this.paymentService = paymentService;
                this.razorpayWebhookSignatureService = razorpayWebhookSignatureService;
                this.paymentWebhookService = paymentWebhookService;
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

        // --------------------------------------------------
        // RAZORPAY WEBHOOK
        // --------------------------------------------------

        @PostMapping("/webhook")
        public ResponseEntity<Void> handleRazorpayWebhook(

                        @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature,

                        @RequestHeader(value = "X-Razorpay-Event-Id", required = false) String eventId,

                        @RequestBody String payload) {

                // --------------------------------------------------
                // 1. VALIDATE EVENT ID
                // --------------------------------------------------

                if (eventId == null || eventId.isBlank()) {

                        return ResponseEntity
                                        .badRequest()
                                        .build();
                }

                // --------------------------------------------------
                // 2. VALIDATE PAYLOAD
                // --------------------------------------------------

                if (payload == null || payload.isBlank()) {

                        return ResponseEntity
                                        .badRequest()
                                        .build();
                }

                // --------------------------------------------------
                // 3. VERIFY RAZORPAY SIGNATURE
                // --------------------------------------------------

                /*
                 * IMPORTANT:
                 *
                 * The signature must be calculated against the
                 * exact raw webhook body.
                 *
                 * Do not parse and re-serialize the JSON before
                 * performing this verification.
                 */
                boolean validSignature = razorpayWebhookSignatureService
                                .verifySignature(
                                                payload,
                                                signature);

                if (!validSignature) {

                        return ResponseEntity
                                        .status(HttpStatus.UNAUTHORIZED)
                                        .build();
                }

                // --------------------------------------------------
                // 4. PROCESS WEBHOOK
                // --------------------------------------------------

                paymentWebhookService.receiveWebhook(
                                eventId,
                                payload);

                // --------------------------------------------------
                // 5. ACKNOWLEDGE WEBHOOK
                // --------------------------------------------------

                return ResponseEntity
                                .ok()
                                .build();
        }
}