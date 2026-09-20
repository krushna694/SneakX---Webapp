package com.sneakx.payment;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpaySignatureService {

    private final String keySecret;

    public RazorpaySignatureService(
            @Value("${razorpay.key.secret}") String keySecret) {

        this.keySecret = keySecret;
    }

    public boolean verifyPaymentSignature(
            String razorpayOrderId,
            String razorpayPaymentId,
            String razorpaySignature) {

        if (razorpayOrderId == null
                || razorpayPaymentId == null
                || razorpaySignature == null) {

            return false;
        }

        String payload = razorpayOrderId + "|" + razorpayPaymentId;

        String generatedSignature = generateHmacSha256(payload, keySecret);

        return MessageDigest.isEqual(
                generatedSignature.getBytes(StandardCharsets.UTF_8),
                razorpaySignature.getBytes(StandardCharsets.UTF_8));
    }

    private String generateHmacSha256(
            String data,
            String secret) {

        try {
            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    secret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");

            mac.init(secretKeySpec);

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
                    "Unable to generate Razorpay signature",
                    e);
        }
    }
}