package com.sneakx.wishlist;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneakx.wishlist.dto.WishlistResponse;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<WishlistResponse> getWishlist(
            Authentication authentication) {

        return ResponseEntity.ok(
                wishlistService.getWishlist(
                        authentication.getName()));
    }

    @PostMapping("/items/{productId}")
    public ResponseEntity<WishlistResponse> addItem(
            Authentication authentication,
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                wishlistService.addItem(
                        authentication.getName(),
                        productId));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<WishlistResponse> removeItem(
            Authentication authentication,
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                wishlistService.removeItem(
                        authentication.getName(),
                        productId));
    }

    @DeleteMapping
    public ResponseEntity<WishlistResponse> clearWishlist(
            Authentication authentication) {

        return ResponseEntity.ok(
                wishlistService.clearWishlist(
                        authentication.getName()));
    }
}