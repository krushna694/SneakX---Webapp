package com.sneakx.inventory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // --------------------------------------------------
    // GET INVENTORY
    // --------------------------------------------------

    @GetMapping("/variant/{variantId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public ResponseEntity<InventoryResponse> getInventory(
            @PathVariable Long variantId) {

        InventoryResponse response = inventoryService.getInventory(variantId);

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------
    // ADD STOCK
    // --------------------------------------------------

    @PostMapping("/variant/{variantId}/add-stock")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public ResponseEntity<InventoryResponse> addStock(
            @PathVariable Long variantId,
            @Valid @RequestBody InventoryAdminRequest request) {

        InventoryResponse response = inventoryService.addStock(
                variantId,
                request.quantity());

        return ResponseEntity.ok(response);
    }
}