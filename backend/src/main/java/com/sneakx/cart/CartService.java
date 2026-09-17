package com.sneakx.cart;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sneakx.cart.dto.AddCartItemRequest;
import com.sneakx.cart.dto.CartItemResponse;
import com.sneakx.cart.dto.CartResponse;
import com.sneakx.cart.dto.UpdateCartItemRequest;
import com.sneakx.common.exception.BadRequestException;
import com.sneakx.common.exception.ResourceNotFoundException;
import com.sneakx.product.Product;
import com.sneakx.product.ProductImage;
import com.sneakx.product.ProductRepository;
import com.sneakx.product.ProductVariant;
import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final com.sneakx.product.ProductRepository productRepository;
    private final com.sneakx.product.ProductVariantRepository productVariantRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            UserRepository userRepository,
            ProductRepository productRepository,
            com.sneakx.product.ProductVariantRepository productVariantRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
    }

    @Transactional
    public CartResponse getCart(String email) {

        User user = getUserByEmail(email);

        Cart cart = getOrCreateCart(user);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse addItem(
            String email,
            AddCartItemRequest request) {

        User user = getUserByEmail(email);

        ProductVariant variant = productVariantRepository
                .findById(request.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product variant not found"));

        validateVariant(variant);

        Cart cart = getOrCreateCart(user);

        CartItem existingItem = cartItemRepository
                .findByCartIdAndVariantId(
                        cart.getId(),
                        variant.getId())
                .orElse(null);

        int requestedQuantity = request.getQuantity();

        if (existingItem != null) {

            int newQuantity = existingItem.getQuantity() + requestedQuantity;

            validateStock(variant, newQuantity);

            existingItem.setQuantity(newQuantity);

            cartItemRepository.save(existingItem);

        } else {

            validateStock(variant, requestedQuantity);

            CartItem cartItem = new CartItem();

            cartItem.setVariant(variant);
            cart.addItem(cartItem);

            cartItem.setQuantity(requestedQuantity);

            cartItemRepository.save(cartItem);
        }

        return buildCartResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse updateItem(
            String email,
            Long variantId,
            UpdateCartItemRequest request) {

        User user = getUserByEmail(email);

        Cart cart = getOrCreateCart(user);

        CartItem cartItem = cartItemRepository
                .findByCartIdAndVariantId(
                        cart.getId(),
                        variantId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cart item not found"));

        ProductVariant variant = cartItem.getVariant();

        validateVariant(variant);

        validateStock(
                variant,
                request.getQuantity());

        cartItem.setQuantity(request.getQuantity());

        cartItemRepository.save(cartItem);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse removeItem(
            String email,
            Long variantId) {

        User user = getUserByEmail(email);

        Cart cart = getOrCreateCart(user);

        CartItem cartItem = cartItemRepository
                .findByCartIdAndVariantId(
                        cart.getId(),
                        variantId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cart item not found"));

        cart.removeItem(cartItem);

        cartItemRepository.delete(cartItem);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse clearCart(String email) {

        User user = getUserByEmail(email);

        Cart cart = getOrCreateCart(user);

        cart.getItems().clear();

        cartItemRepository.deleteAllByCartId(cart.getId());

        return buildCartResponse(cart);
    }

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found"));
    }

    private Cart getOrCreateCart(User user) {

        return cartRepository
                .findByUserId(user.getId())
                .orElseGet(() -> {

                    Cart cart = new Cart();

                    cart.setUser(user);

                    return cartRepository.save(cart);
                });
    }

    private void validateVariant(ProductVariant variant) {

        Product product = variant.getProduct();

        if (!variant.isActive()) {
            throw new BadRequestException(
                    "This product variant is no longer available");
        }

        if (!product.isActive()) {
            throw new BadRequestException(
                    "This product is no longer available");
        }
    }

    private void validateStock(
            ProductVariant variant,
            int requestedQuantity) {

        if (requestedQuantity <= 0) {
            throw new BadRequestException(
                    "Quantity must be greater than zero");
        }

        if (requestedQuantity > variant.getStockQuantity()) {

            throw new BadRequestException(
                    "Insufficient stock. Available quantity: "
                            + variant.getStockQuantity());
        }
    }

    private CartResponse buildCartResponse(Cart cart) {

        List<CartItemResponse> items = cart.getItems()
                .stream()
                .map(this::toCartItemResponse)
                .toList();

        int totalItems = items.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();

        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::getTotalPrice)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        return new CartResponse(
                cart.getId(),
                items,
                totalItems,
                subtotal);
    }

    private CartItemResponse toCartItemResponse(
            CartItem cartItem) {

        ProductVariant variant = cartItem.getVariant();

        Product product = variant.getProduct();

        BigDecimal basePrice = variant.getPriceOverride() != null
                ? variant.getPriceOverride()
                : product.getPrice();

        BigDecimal discount = product.getDiscountPercentage();

        BigDecimal discountedPrice = basePrice
                .subtract(
                        basePrice
                                .multiply(discount)
                                .divide(
                                        BigDecimal.valueOf(100),
                                        2,
                                        RoundingMode.HALF_UP))
                .setScale(
                        2,
                        RoundingMode.HALF_UP);

        BigDecimal totalPrice = discountedPrice
                .multiply(
                        BigDecimal.valueOf(
                                cartItem.getQuantity()))
                .setScale(
                        2,
                        RoundingMode.HALF_UP);

        String imageUrl = product.getImages()
                .stream()
                .filter(ProductImage::isPrimary)
                .map(ProductImage::getImageUrl)
                .findFirst()
                .orElseGet(() -> product.getImages()
                        .stream()
                        .findFirst()
                        .map(ProductImage::getImageUrl)
                        .orElse(null));

        return new CartItemResponse(
                cartItem.getId(),
                product.getId(),
                variant.getId(),
                product.getName(),
                product.getBrand(),
                variant.getSize(),
                imageUrl,
                discountedPrice,
                cartItem.getQuantity(),
                totalPrice);
    }
}