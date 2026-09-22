package com.sneakx.payment;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayWebhookSignatureService {

    private final String webhookSecret;

    public RazorpayWebhookSignatureService(
            @Value("${razorpay.webhook.secret}") String webhookSecret) {

        this.webhookSecret = webhookSecret;
    }

    public boolean verifySignature(String payload, String receivedSignature) {

        if (payload == null || receivedSignature == null) {
            return false;
        }

        if (webhookSecret == null || webhookSecret.isBlank()) {
            return false;
        }

        String generatedSignature = generateHmacSha256(
                payload,
                webhookSecret);

        return MessageDigest.isEqual(
                generatedSignature.getBytes(StandardCharsets.UTF_8),
                receivedSignature.getBytes(StandardCharsets.UTF_8));
    }

    private String generateHmacSha256(
            String data,
            String secret) {

        try {

            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKey = new SecretKeySpec(
                    secret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");

            mac.init(secretKey);

            byte[] hash = mac.doFinal(
                    data.getBytes(StandardCharsets.UTF_8));

            StringBuilder hex = new StringBuilder();

            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }

            return hex.toString();

        } catch (NoSuchAlgorithmException e) {

            throw new IllegalStateException(
                    "HMAC SHA256 algorithm is not available",
                    e);

        } catch (Exception e) {

            throw new IllegalStateException(
                    "Unable to generate Razorpay webhook signature",
                    e);
        }
    }
}