package com.sneakx.payment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrderId(Long orderId);

    Optional<Payment> findByIdempotencyKey(String idempotencyKey);

    Optional<Payment> findByProviderPaymentId(
            String providerPaymentId);

    boolean existsByOrderId(Long orderId);

    boolean existsByIdempotencyKey(String idempotencyKey);
}