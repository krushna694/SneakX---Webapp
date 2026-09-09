package com.sneakx.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ProductResponse(
        Long id,
        Long categoryId,
        String categoryName,
        String name,
        String slug,
        String description,
        String brand,
        BigDecimal price,
        BigDecimal discountPercentage,
        BigDecimal discountedPrice,
        boolean active,
        List<ProductImageResponse> images,
        List<ProductVariantResponse> variants,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

    public record ProductImageResponse(
            Long id,
            String imageUrl,
            Integer displayOrder,
            boolean primary) {
    }

    public record ProductVariantResponse(
            Long id,
            String sku,
            String size,
            Integer stockQuantity,
            BigDecimal priceOverride,
            boolean active) {
    }
}