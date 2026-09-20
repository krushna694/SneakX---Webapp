package com.sneakx.payment;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.sneakx.order.Order;

@Service
public class RazorpayService {

    private final RestClient razorpayRestClient;

    public RazorpayService(RestClient razorpayRestClient) {
        this.razorpayRestClient = razorpayRestClient;
    }

    public RazorpayOrderResponse createOrder(Order order, String keyId) {

        if (order == null) {
            throw new IllegalArgumentException("Order is required");
        }

        if (order.getTotalAmount() == null) {
            throw new IllegalStateException("Order total amount is missing");
        }

        if (order.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("Order amount must be greater than zero");
        }

        long amountInPaise = order.getTotalAmount()
                .movePointRight(2)
                .longValueExact();

        Map<String, Object> requestBody = Map.of(
                "amount", amountInPaise,
                "currency", "INR",
                "receipt", order.getOrderNumber(),
                "notes", Map.of(
                        "local_order_id", String.valueOf(order.getId()),
                        "order_number", order.getOrderNumber()));

        RazorpayApiOrderResponse response = razorpayRestClient
                .post()
                .uri("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(RazorpayApiOrderResponse.class);

        if (response == null || response.id() == null) {
            throw new IllegalStateException(
                    "Razorpay did not return a valid order ID");
        }

        return new RazorpayOrderResponse(
                response.id(),
                order.getId(),
                order.getOrderNumber(),
                response.amount(),
                response.currency(),
                keyId);
    }

    private record RazorpayApiOrderResponse(
            String id,
            String entity,
            Long amount,
            String amount_paid,
            String amount_due,
            String currency,
            String receipt,
            String status) {
    }
}