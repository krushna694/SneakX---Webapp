package com.sneakx.cart.dto;

import java.math.BigDecimal;

public class CartItemResponse {

    private Long cartItemId;
    private Long productId;
    private Long variantId;

    private String productName;
    private String brand;
    private String size;
    private String imageUrl;

    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal totalPrice;

    public CartItemResponse() {
    }

    public CartItemResponse(
            Long cartItemId,
            Long productId,
            Long variantId,
            String productName,
            String brand,
            String size,
            String imageUrl,
            BigDecimal unitPrice,
            Integer quantity,
            BigDecimal totalPrice) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.variantId = variantId;
        this.productName = productName;
        this.brand = brand;
        this.size = size;
        this.imageUrl = imageUrl;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}