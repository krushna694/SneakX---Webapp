package com.sneakx.payment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

public interface PaymentRepository
                extends JpaRepository<Payment, Long> {

        Optional<Payment> findByOrderId(Long orderId);

        Optional<Payment> findByIdempotencyKey(String idempotencyKey);

        Optional<Payment> findByProviderPaymentId(
                        String providerPaymentId);

        Optional<Payment> findByProviderOrderId(
                        String providerOrderId);

        @Lock(LockModeType.PESSIMISTIC_WRITE)
        @Query("SELECT p FROM Payment p WHERE p.id = :paymentId")
        Optional<Payment> findByIdForUpdate(
                        @Param("paymentId") Long paymentId);

        boolean existsByOrderId(Long orderId);

        boolean existsByIdempotencyKey(String idempotencyKey);
}