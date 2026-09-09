package com.sneakx.product;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class ProductRequest {

    @NotNull(message = "Category ID is required")
    @Positive(message = "Category ID must be positive")
    private Long categoryId;

    @NotBlank(message = "Product name is required")
    @Size(max = 255, message = "Product name must not exceed 255 characters")
    private String name;

    @NotBlank(message = "Product slug is required")
    @Size(max = 300, message = "Product slug must not exceed 300 characters")
    private String slug;

    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;

    @NotBlank(message = "Brand is required")
    @Size(max = 150, message = "Brand must not exceed 150 characters")
    private String brand;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.00", message = "Price must not be negative")
    @Digits(integer = 10, fraction = 2, message = "Price must have at most 2 decimal places")
    private BigDecimal price;

    @NotNull(message = "Discount percentage is required")
    @DecimalMin(value = "0.00", message = "Discount must not be negative")
    @DecimalMax(value = "100.00", message = "Discount must not exceed 100")
    @Digits(integer = 3, fraction = 2, message = "Discount must have at most 2 decimal places")
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    private Boolean active = true;

    @Valid
    private List<ProductImageRequest> images = new ArrayList<>();

    @Valid
    private List<ProductVariantRequest> variants = new ArrayList<>();

    public ProductRequest() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<ProductImageRequest> getImages() {
        return images;
    }

    public void setImages(List<ProductImageRequest> images) {
        this.images = images;
    }

    public List<ProductVariantRequest> getVariants() {
        return variants;
    }

    public void setVariants(List<ProductVariantRequest> variants) {
        this.variants = variants;
    }

    public static class ProductImageRequest {

        @NotBlank(message = "Image URL is required")
        @Size(max = 1000, message = "Image URL must not exceed 1000 characters")
        private String imageUrl;

        @NotNull(message = "Display order is required")
        @Min(value = 0, message = "Display order must not be negative")
        private Integer displayOrder = 0;

        private boolean primary;

        public ProductImageRequest() {
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public Integer getDisplayOrder() {
            return displayOrder;
        }

        public void setDisplayOrder(Integer displayOrder) {
            this.displayOrder = displayOrder;
        }

        public boolean isPrimary() {
            return primary;
        }

        public void setPrimary(boolean primary) {
            this.primary = primary;
        }
    }

    public static class ProductVariantRequest {

        @NotBlank(message = "SKU is required")
        @Size(max = 100, message = "SKU must not exceed 100 characters")
        private String sku;

        @NotBlank(message = "Size is required")
        @Size(max = 30, message = "Size must not exceed 30 characters")
        private String size;

        @NotNull(message = "Stock quantity is required")
        @Min(value = 0, message = "Stock quantity must not be negative")
        private Integer stockQuantity = 0;

        @DecimalMin(value = "0.00", message = "Price override must not be negative")
        @Digits(integer = 10, fraction = 2, message = "Price override must have at most 2 decimal places")
        private BigDecimal priceOverride;

        private Boolean active = true;

        public ProductVariantRequest() {
        }

        public String getSku() {
            return sku;
        }

        public void setSku(String sku) {
            this.sku = sku;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }

        public Integer getStockQuantity() {
            return stockQuantity;
        }

        public void setStockQuantity(Integer stockQuantity) {
            this.stockQuantity = stockQuantity;
        }

        public BigDecimal getPriceOverride() {
            return priceOverride;
        }

        public void setPriceOverride(BigDecimal priceOverride) {
            this.priceOverride = priceOverride;
        }

        public Boolean getActive() {
            return active;
        }

        public void setActive(Boolean active) {
            this.active = active;
        }
    }
}