
package com.sneakx.order;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

public interface OrderRepository extends JpaRepository<Order, Long> {

        Optional<Order> findByOrderNumber(String orderNumber);

        Optional<Order> findByIdAndUserId(Long id, Long userId);

        Optional<Order> findByOrderNumberAndUserId(
                        String orderNumber,
                        Long userId);

        List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

        boolean existsByOrderNumber(String orderNumber);

        @Lock(LockModeType.PESSIMISTIC_WRITE)
        @Query("""
                        SELECT o
                        FROM Order o
                        WHERE o.id = :orderId
                          AND o.user.id = :userId
                        """)
        Optional<Order> findByIdAndUserIdForUpdate(
                        @Param("orderId") Long orderId,
                        @Param("userId") Long userId);

        @Query("""
                        SELECT COALESCE(SUM(o.totalAmount), 0)
                        FROM Order o
                        WHERE o.status <> com.sneakx.order.OrderStatus.CANCELLED
                          AND o.paymentStatus IN (
                              com.sneakx.payment.PaymentStatus.SUCCESS,
                              com.sneakx.payment.PaymentStatus.PAID
                          )
                        """)
        BigDecimal calculateTotalRevenue();
}
