package com.sneakx.inventory;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record InventoryAdminRequest(

        @NotNull(message = "Quantity is required") @Min(value = 1, message = "Quantity must be greater than zero") Integer quantity

) {
}