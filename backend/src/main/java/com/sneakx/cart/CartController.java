package com.sneakx.cart;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneakx.cart.dto.AddCartItemRequest;
import com.sneakx.cart.dto.CartResponse;
import com.sneakx.cart.dto.UpdateCartItemRequest;
import com.sneakx.common.response.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {

        private final CartService cartService;

        public CartController(CartService cartService) {
                this.cartService = cartService;
        }

        @GetMapping
        public ResponseEntity<ApiResponse<CartResponse>> getCart(
                        Authentication authentication) {

                CartResponse cart = cartService.getCart(authentication.getName());

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Cart fetched successfully",
                                                cart));
        }

        @PostMapping("/items")
        public ResponseEntity<ApiResponse<CartResponse>> addItem(
                        Authentication authentication,
                        @Valid @RequestBody AddCartItemRequest request) {

                CartResponse cart = cartService.addItem(
                                authentication.getName(),
                                request);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Item added to cart successfully",
                                                cart));
        }

        @PutMapping("/items/{variantId}")
        public ResponseEntity<ApiResponse<CartResponse>> updateItem(
                        Authentication authentication,
                        @PathVariable Long variantId,
                        @Valid @RequestBody UpdateCartItemRequest request) {

                CartResponse cart = cartService.updateItem(
                                authentication.getName(),
                                variantId,
                                request);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Cart item updated successfully",
                                                cart));
        }

        @DeleteMapping("/items/{variantId}")
        public ResponseEntity<ApiResponse<CartResponse>> removeItem(
                        Authentication authentication,
                        @PathVariable Long variantId) {

                CartResponse cart = cartService.removeItem(
                                authentication.getName(),
                                variantId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Item removed from cart successfully",
                                                cart));
        }

        @DeleteMapping
        public ResponseEntity<ApiResponse<CartResponse>> clearCart(
                        Authentication authentication) {

                CartResponse cart = cartService.clearCart(
                                authentication.getName());

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Cart cleared successfully",
                                                cart));
        }
}