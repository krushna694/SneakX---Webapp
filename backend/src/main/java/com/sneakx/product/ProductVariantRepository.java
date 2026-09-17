package com.sneakx.product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductVariantRepository
        extends JpaRepository<ProductVariant, Long> {

    Optional<ProductVariant> findBySku(String sku);

    boolean existsBySku(String sku);

    boolean existsByProductIdAndSize(
            Long productId,
            String size);
}