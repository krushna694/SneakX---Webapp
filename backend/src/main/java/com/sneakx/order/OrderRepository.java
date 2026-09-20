package com.sneakx.order;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(String orderNumber);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    Optional<Order> findByOrderNumberAndUserId(
            String orderNumber,
            Long userId);

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    boolean existsByOrderNumber(String orderNumber);
}