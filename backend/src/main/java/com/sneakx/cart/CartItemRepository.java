package com.sneakx.cart;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartIdAndVariantId(
            Long cartId,
            Long variantId);

    boolean existsByCartIdAndVariantId(
            Long cartId,
            Long variantId);

    void deleteByCartIdAndVariantId(
            Long cartId,
            Long variantId);

    void deleteAllByCartId(Long cartId);
}