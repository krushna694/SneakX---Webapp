package com.sneakx.inventory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sneakx.product.ProductVariant;
import com.sneakx.product.ProductVariantRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductVariantRepository productVariantRepository;

    public InventoryService(
            InventoryRepository inventoryRepository,
            ProductVariantRepository productVariantRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productVariantRepository = productVariantRepository;
    }

    // --------------------------------------------------
    // GET INVENTORY
    // --------------------------------------------------

    @Transactional(readOnly = true)
    public InventoryResponse getInventory(Long variantId) {

        Inventory inventory = inventoryRepository.findByVariantId(variantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Inventory not found for variant: " + variantId));

        return toResponse(inventory);
    }

    // --------------------------------------------------
    // CREATE INVENTORY
    // --------------------------------------------------

    @Transactional
    public InventoryResponse createInventory(
            Long variantId,
            int initialQuantity) {

        if (initialQuantity < 0) {
            throw new IllegalArgumentException(
                    "Initial quantity cannot be negative");
        }

        if (inventoryRepository.existsByVariantId(variantId)) {
            throw new IllegalStateException(
                    "Inventory already exists for variant: " + variantId);
        }

        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product variant not found: " + variantId));

        Inventory inventory = new Inventory();

        inventory.setVariant(variant);
        inventory.setAvailableQuantity(initialQuantity);
        inventory.setReservedQuantity(0);

        Inventory savedInventory = inventoryRepository.save(inventory);

        return toResponse(savedInventory);
    }

    // --------------------------------------------------
    // ADD STOCK
    // --------------------------------------------------

    @Transactional
    public InventoryResponse addStock(
            Long variantId,
            int quantity) {

        validatePositiveQuantity(quantity);

        Inventory inventory = inventoryRepository
                .findByVariantIdForUpdate(variantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Inventory not found for variant: " + variantId));

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() + quantity);

        return toResponse(inventoryRepository.save(inventory));
    }

    // --------------------------------------------------
    // RESERVE STOCK
    // --------------------------------------------------

    @Transactional
    public void reserveStock(
            Long variantId,
            int quantity) {

        validatePositiveQuantity(quantity);

        Inventory inventory = inventoryRepository
                .findByVariantIdForUpdate(variantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Inventory not found for variant: " + variantId));

        if (inventory.getAvailableQuantity() < quantity) {
            throw new IllegalStateException(
                    "Insufficient stock for variant: " + variantId);
        }

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() - quantity);

        inventory.setReservedQuantity(
                inventory.getReservedQuantity() + quantity);

        inventoryRepository.save(inventory);
    }

    // --------------------------------------------------
    // RELEASE RESERVED STOCK
    // --------------------------------------------------

    @Transactional
    public void releaseStock(
            Long variantId,
            int quantity) {

        validatePositiveQuantity(quantity);

        Inventory inventory = inventoryRepository
                .findByVariantIdForUpdate(variantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Inventory not found for variant: " + variantId));

        if (inventory.getReservedQuantity() < quantity) {
            throw new IllegalStateException(
                    "Cannot release more stock than reserved");
        }

        inventory.setReservedQuantity(
                inventory.getReservedQuantity() - quantity);

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() + quantity);

        inventoryRepository.save(inventory);
    }

    // --------------------------------------------------
    // CONFIRM RESERVED STOCK
    // --------------------------------------------------

    @Transactional
    public void confirmReservedStock(
            Long variantId,
            int quantity) {

        validatePositiveQuantity(quantity);

        Inventory inventory = inventoryRepository
                .findByVariantIdForUpdate(variantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Inventory not found for variant: " + variantId));

        if (inventory.getReservedQuantity() < quantity) {
            throw new IllegalStateException(
                    "Cannot confirm more stock than reserved");
        }

        inventory.setReservedQuantity(
                inventory.getReservedQuantity() - quantity);

        inventoryRepository.save(inventory);
    }

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    private void validatePositiveQuantity(int quantity) {

        if (quantity <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }
    }

    // --------------------------------------------------
    // RESPONSE MAPPER
    // --------------------------------------------------

    private InventoryResponse toResponse(Inventory inventory) {

        ProductVariant variant = inventory.getVariant();

        return new InventoryResponse(
                inventory.getId(),
                variant.getId(),
                variant.getSku(),
                inventory.getAvailableQuantity(),
                inventory.getReservedQuantity());
    }
}