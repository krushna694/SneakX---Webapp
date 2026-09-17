package com.sneakx.cart.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {

    private Long cartId;
    private List<CartItemResponse> items;
    private Integer totalItems;
    private BigDecimal subtotal;

    public CartResponse() {
    }

    public CartResponse(
            Long cartId,
            List<CartItemResponse> items,
            Integer totalItems,
            BigDecimal subtotal) {
        this.cartId = cartId;
        this.items = items;
        this.totalItems = totalItems;
        this.subtotal = subtotal;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }

    public Integer getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}