package com.sneakx.wishlist;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}