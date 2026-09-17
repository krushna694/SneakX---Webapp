package com.sneakx.wishlist;

import java.time.LocalDateTime;

import com.sneakx.product.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "wishlist_items")
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "wishlist_id", nullable = false, foreignKey = @ForeignKey(name = "fk_wishlist_items_wishlist"))
    private Wishlist wishlist;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_wishlist_items_product"))
    private Product product;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public WishlistItem() {
    }

    public Long getId() {
        return id;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
    }
}