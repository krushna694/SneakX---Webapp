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

    public PaymentWebhookService(
            PaymentWebhookEventRepository webhookEventRepository,
            ObjectMapper objectMapper) {

        this.webhookEventRepository = webhookEventRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public void receiveWebhook(String eventId, String eventType, String payload) {

        if (eventId == null || eventId.isBlank()) {
            throw new IllegalArgumentException("Webhook event ID is required");
        }

        if (eventType == null || eventType.isBlank()) {
            throw new IllegalArgumentException("Webhook event type is required");
        }

        if (payload == null || payload.isBlank()) {
            throw new IllegalArgumentException("Webhook payload is required");
        }

        /*
         * Idempotency:
         *
         * Razorpay can send the same webhook more than once.
         * If we already have this event ID, don't process it again.
         */
        if (webhookEventRepository.existsByEventId(eventId)) {
            return;
        }

        String paymentId = null;
        String razorpayOrderId = null;

        try {

            JsonNode root = objectMapper.readTree(payload);

            JsonNode paymentEntity = root.path("payload")
                    .path("payment")
                    .path("entity");

            if (!paymentEntity.isMissingNode()) {

                if (paymentEntity.hasNonNull("id")) {
                    paymentId = paymentEntity.get("id").asText();
                }

                if (paymentEntity.hasNonNull("order_id")) {
                    razorpayOrderId = paymentEntity.get("order_id").asText();
                }
            }

        } catch (Exception e) {

            throw new IllegalArgumentException(
                    "Invalid Razorpay webhook payload",
                    e);
        }

        PaymentWebhookEvent webhookEvent = new PaymentWebhookEvent();

        webhookEvent.setEventId(eventId);
        webhookEvent.setEventType(eventType);
        webhookEvent.setPaymentId(paymentId);
        webhookEvent.setRazorpayOrderId(razorpayOrderId);
        webhookEvent.setPayload(payload);
        webhookEvent.setProcessed(false);

        webhookEventRepository.save(webhookEvent);
    }

    @Transactional
    public void markProcessed(PaymentWebhookEvent webhookEvent) {

        webhookEvent.setProcessed(true);
        webhookEvent.setProcessedAt(LocalDateTime.now());

        webhookEventRepository.save(webhookEvent);
    }
}