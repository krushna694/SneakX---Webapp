package com.sneakx.payment;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PaymentWebhookService {

        private final PaymentWebhookEventRepository webhookEventRepository;
        private final ObjectMapper objectMapper;
        private final PaymentService paymentService;

        public PaymentWebhookService(
                        PaymentWebhookEventRepository webhookEventRepository,
                        ObjectMapper objectMapper,
                        PaymentService paymentService) {

                this.webhookEventRepository = webhookEventRepository;
                this.objectMapper = objectMapper;
                this.paymentService = paymentService;
        }

        // --------------------------------------------------
        // RECEIVE + PROCESS WEBHOOK
        // --------------------------------------------------

        @Transactional
        public void receiveWebhook(
                        String eventId,
                        String payload) {

                // --------------------------------------------------
                // BASIC VALIDATION
                // --------------------------------------------------

                if (eventId == null || eventId.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Webhook event ID is required");
                }

                if (payload == null || payload.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Webhook payload is required");
                }

                String normalizedEventId = eventId.trim();

                // --------------------------------------------------
                // IDEMPOTENCY CHECK
                // --------------------------------------------------

                /*
                 * Razorpay may deliver the same webhook more than once.
                 *
                 * If this event has already been recorded,
                 * do not process it again.
                 */
                if (webhookEventRepository
                                .existsByEventId(normalizedEventId)) {

                        return;
                }

                // --------------------------------------------------
                // PARSE PAYLOAD
                // --------------------------------------------------

                JsonNode root;

                try {

                        root = objectMapper.readTree(payload);

                } catch (Exception e) {

                        throw new IllegalArgumentException(
                                        "Invalid Razorpay webhook payload",
                                        e);
                }

                // --------------------------------------------------
                // EXTRACT EVENT TYPE
                // --------------------------------------------------

                String eventType = root.path("event").asText(null);

                if (eventType == null || eventType.isBlank()) {

                        throw new IllegalArgumentException(
                                        "Razorpay webhook event type is missing");
                }

                // --------------------------------------------------
                // EXTRACT PAYMENT ENTITY
                // --------------------------------------------------

                JsonNode paymentEntity = root.path("payload")
                                .path("payment")
                                .path("entity");

                String providerPaymentId = getTextValue(
                                paymentEntity,
                                "id");

                String razorpayOrderId = getTextValue(
                                paymentEntity,
                                "order_id");

                // --------------------------------------------------
                // EXTRACT FAILURE INFORMATION
                // --------------------------------------------------

                String failureReason = getFailureReason(paymentEntity);

                // --------------------------------------------------
                // CREATE WEBHOOK EVENT
                // --------------------------------------------------

                PaymentWebhookEvent webhookEvent = new PaymentWebhookEvent();

                webhookEvent.setEventId(
                                normalizedEventId);

                webhookEvent.setEventType(
                                eventType);

                webhookEvent.setPaymentId(
                                providerPaymentId);

                webhookEvent.setRazorpayOrderId(
                                razorpayOrderId);

                webhookEvent.setPayload(
                                payload);

                webhookEvent.setProcessed(false);

                webhookEventRepository.save(
                                webhookEvent);

                // --------------------------------------------------
                // PROCESS EVENT
                // --------------------------------------------------

                processEvent(
                                eventType,
                                providerPaymentId,
                                razorpayOrderId,
                                failureReason);

                // --------------------------------------------------
                // MARK PROCESSED
                // --------------------------------------------------

                webhookEvent.setProcessed(true);

                webhookEvent.setProcessedAt(
                                LocalDateTime.now());

                webhookEventRepository.save(
                                webhookEvent);
        }

        // --------------------------------------------------
        // EVENT PROCESSOR
        // --------------------------------------------------

        private void processEvent(
                        String eventType,
                        String providerPaymentId,
                        String razorpayOrderId,
                        String failureReason) {

                // --------------------------------------------------
                // PAYMENT CAPTURED
                // --------------------------------------------------

                if ("payment.captured".equals(eventType)) {

                        requireValue(
                                        providerPaymentId,
                                        "Payment ID missing from payment.captured webhook");

                        requireValue(
                                        razorpayOrderId,
                                        "Razorpay order ID missing from payment.captured webhook");

                        Payment payment = paymentService
                                        .findPaymentByProviderOrderId(
                                                        razorpayOrderId);

                        /*
                         * markPaymentSuccessful() is idempotent.
                         *
                         * If frontend verification already completed
                         * the payment, this safely returns without
                         * confirming inventory twice.
                         */
                        paymentService.markPaymentSuccessful(
                                        payment.getId(),
                                        providerPaymentId,
                                        null);

                        return;
                }

                // --------------------------------------------------
                // PAYMENT FAILED
                // --------------------------------------------------

                if ("payment.failed".equals(eventType)) {

                        requireValue(
                                        providerPaymentId,
                                        "Payment ID missing from payment.failed webhook");

                        requireValue(
                                        razorpayOrderId,
                                        "Razorpay order ID missing from payment.failed webhook");

                        Payment payment = paymentService
                                        .findPaymentByProviderOrderId(
                                                        razorpayOrderId);

                        /*
                         * If another flow already confirmed the payment,
                         * a later failed notification must not change it.
                         */
                        if (payment.getStatus() == PaymentStatus.SUCCESS) {

                                return;
                        }

                        paymentService.markPaymentFailed(
                                        payment.getId(),
                                        failureReason);

                        return;
                }

                // --------------------------------------------------
                // UNKNOWN / UNSUPPORTED EVENT
                // --------------------------------------------------

                /*
                 * Keep the webhook event in the database for auditing,
                 * but do not modify payment, order, or inventory.
                 */
        }

        // --------------------------------------------------
        // REQUIRED VALUE
        // --------------------------------------------------

        private void requireValue(
                        String value,
                        String message) {

                if (value == null || value.isBlank()) {
                        throw new IllegalArgumentException(message);
                }
        }

        // --------------------------------------------------
        // TEXT EXTRACTION
        // --------------------------------------------------

        private String getTextValue(
                        JsonNode node,
                        String fieldName) {

                if (node == null
                                || node.isMissingNode()
                                || node.isNull()) {

                        return null;
                }

                JsonNode field = node.get(fieldName);

                if (field == null
                                || field.isNull()) {

                        return null;
                }

                String value = field.asText(null);

                if (value == null
                                || value.isBlank()) {

                        return null;
                }

                return value;
        }

        // --------------------------------------------------
        // FAILURE REASON
        // --------------------------------------------------

        private String getFailureReason(
                        JsonNode paymentEntity) {

                String description = getTextValue(
                                paymentEntity,
                                "error_description");

                if (description != null) {
                        return description;
                }

                String reason = getTextValue(
                                paymentEntity,
                                "error_reason");

                if (reason != null) {
                        return reason;
                }

                String code = getTextValue(
                                paymentEntity,
                                "error_code");

                if (code != null) {
                        return "Razorpay payment failed: " + code;
                }

                return "Payment failed";
        }

        // --------------------------------------------------
        // MANUAL MARK PROCESSED
        // --------------------------------------------------

        @Transactional
        public void markProcessed(
                        PaymentWebhookEvent webhookEvent) {

                webhookEvent.setProcessed(true);

                webhookEvent.setProcessedAt(
                                LocalDateTime.now());

                webhookEventRepository.save(
                                webhookEvent);
        }
}