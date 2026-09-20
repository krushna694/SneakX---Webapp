package com.sneakx.inventory;

public record InventoryResponse(
        Long inventoryId,
        Long variantId,
        String sku,
        Integer availableQuantity,
        Integer reservedQuantity
) {
}