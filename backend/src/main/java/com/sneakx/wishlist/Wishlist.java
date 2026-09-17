package com.sneakx.wishlist;

import com.sneakx.user.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "wishlists")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true, foreignKey = @ForeignKey(name = "fk_wishlists_user"))
    private User user;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "wishlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WishlistItem> items = new ArrayList<>();

    public Wishlist() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<WishlistItem> getItems() {
        return items;
    }

    public void addItem(WishlistItem item) {

        items.add(item);
        item.setWishlist(this);
    }

    public void removeItem(WishlistItem item) {

        items.remove(item);
        item.setWishlist(null);
    }

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}