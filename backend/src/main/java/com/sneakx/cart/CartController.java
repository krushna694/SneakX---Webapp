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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.getCart(authentication.getName()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            Authentication authentication,
            @Valid @RequestBody AddCartItemRequest request) {

        return ResponseEntity.ok(
                cartService.addItem(
                        authentication.getName(),
                        request));
    }

    @PutMapping("/items/{variantId}")
    public ResponseEntity<CartResponse> updateItem(
            Authentication authentication,
            @PathVariable Long variantId,
            @Valid @RequestBody UpdateCartItemRequest request) {

        return ResponseEntity.ok(
                cartService.updateItem(
                        authentication.getName(),
                        variantId,
                        request));
    }

    @DeleteMapping("/items/{variantId}")
    public ResponseEntity<CartResponse> removeItem(
            Authentication authentication,
            @PathVariable Long variantId) {

        return ResponseEntity.ok(
                cartService.removeItem(
                        authentication.getName(),
                        variantId));
    }

    @DeleteMapping
    public ResponseEntity<CartResponse> clearCart(
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.clearCart(
                        authentication.getName()));
    }
}