package com.sneakx.wishlist;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneakx.common.response.ApiResponse;
import com.sneakx.wishlist.dto.WishlistResponse;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

        private final WishlistService wishlistService;

        public WishlistController(WishlistService wishlistService) {
                this.wishlistService = wishlistService;
        }

        @GetMapping
        public ResponseEntity<ApiResponse<WishlistResponse>> getWishlist(
                        Authentication authentication) {

                WishlistResponse wishlist = wishlistService.getWishlist(
                                authentication.getName());

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Wishlist fetched successfully",
                                                wishlist));
        }

        @PostMapping("/items/{productId}")
        public ResponseEntity<ApiResponse<WishlistResponse>> addItem(
                        Authentication authentication,
                        @PathVariable Long productId) {

                WishlistResponse wishlist = wishlistService.addItem(
                                authentication.getName(),
                                productId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Product added to wishlist successfully",
                                                wishlist));
        }

        @DeleteMapping("/items/{productId}")
        public ResponseEntity<ApiResponse<WishlistResponse>> removeItem(
                        Authentication authentication,
                        @PathVariable Long productId) {

                WishlistResponse wishlist = wishlistService.removeItem(
                                authentication.getName(),
                                productId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Product removed from wishlist successfully",
                                                wishlist));
        }

        @DeleteMapping
        public ResponseEntity<ApiResponse<WishlistResponse>> clearWishlist(
                        Authentication authentication) {

                WishlistResponse wishlist = wishlistService.clearWishlist(
                                authentication.getName());

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Wishlist cleared successfully",
                                                wishlist));
        }
}