package com.sneakx.wishlist.dto;

import java.math.BigDecimal;

public class WishlistItemResponse {

    private Long wishlistItemId;
    private Long productId;

    private String productName;
    private String brand;
    private String slug;
    private String imageUrl;

    private BigDecimal price;
    private BigDecimal discountPercentage;
    private BigDecimal discountedPrice;

    public WishlistItemResponse() {
    }

    public WishlistItemResponse(
            Long wishlistItemId,
            Long productId,
            String productName,
            String brand,
            String slug,
            String imageUrl,
            BigDecimal price,
            BigDecimal discountPercentage,
            BigDecimal discountedPrice) {
        this.wishlistItemId = wishlistItemId;
        this.productId = productId;
        this.productName = productName;
        this.brand = brand;
        this.slug = slug;
        this.imageUrl = imageUrl;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.discountedPrice = discountedPrice;
    }

    public Long getWishlistItemId() {
        return wishlistItemId;
    }

    public void setWishlistItemId(Long wishlistItemId) {
        this.wishlistItemId = wishlistItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(BigDecimal discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public BigDecimal getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(BigDecimal discountedPrice) {
        this.discountedPrice = discountedPrice;
    }
}