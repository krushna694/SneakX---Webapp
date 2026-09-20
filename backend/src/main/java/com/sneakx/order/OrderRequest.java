package com.sneakx.order;

import jakarta.validation.constraints.NotNull;

public class OrderRequest {

    @NotNull(message = "Address ID is required")
    private Long addressId;

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }
}