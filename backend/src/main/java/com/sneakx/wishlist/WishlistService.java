package com.sneakx.wishlist;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sneakx.common.exception.BadRequestException;
import com.sneakx.common.exception.ResourceNotFoundException;
import com.sneakx.product.Product;
import com.sneakx.product.ProductImage;
import com.sneakx.product.ProductRepository;
import com.sneakx.user.User;
import com.sneakx.user.UserRepository;
import com.sneakx.wishlist.dto.WishlistItemResponse;
import com.sneakx.wishlist.dto.WishlistResponse;

import jakarta.transaction.Transactional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(
            WishlistRepository wishlistRepository,
            WishlistItemRepository wishlistItemRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public WishlistResponse getWishlist(String email) {

        User user = getUserByEmail(email);

        Wishlist wishlist = getOrCreateWishlist(user);

        return buildWishlistResponse(wishlist);
    }

    @Transactional
    public WishlistResponse addItem(
            String email,
            Long productId) {

        User user = getUserByEmail(email);

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found"));

        validateProduct(product);

        Wishlist wishlist = getOrCreateWishlist(user);

        boolean alreadyExists = wishlistItemRepository
                .existsByWishlistIdAndProductId(
                        wishlist.getId(),
                        productId);

        if (alreadyExists) {

            throw new BadRequestException(
                    "Product is already in your wishlist");
        }

        WishlistItem item = new WishlistItem();

        item.setProduct(product);

        wishlist.addItem(item);

        wishlistItemRepository.save(item);

        return buildWishlistResponse(wishlist);
    }

    @Transactional
    public WishlistResponse removeItem(
            String email,
            Long productId) {

        User user = getUserByEmail(email);

        Wishlist wishlist = getOrCreateWishlist(user);

        WishlistItem item = wishlistItemRepository
                .findByWishlistIdAndProductId(
                        wishlist.getId(),
                        productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product is not in your wishlist"));

        wishlist.removeItem(item);

        wishlistItemRepository.delete(item);

        return buildWishlistResponse(wishlist);
    }

    @Transactional
    public WishlistResponse clearWishlist(
            String email) {

        User user = getUserByEmail(email);

        Wishlist wishlist = getOrCreateWishlist(user);

        wishlist.getItems().clear();

        wishlistItemRepository
                .deleteAllByWishlistId(
                        wishlist.getId());

        return buildWishlistResponse(wishlist);
    }

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found"));
    }

    private Wishlist getOrCreateWishlist(
            User user) {

        return wishlistRepository
                .findByUserId(user.getId())
                .orElseGet(() -> {

                    Wishlist wishlist = new Wishlist();

                    wishlist.setUser(user);

                    return wishlistRepository
                            .save(wishlist);
                });
    }

    private void validateProduct(Product product) {

        if (!product.isActive()) {

            throw new BadRequestException(
                    "This product is no longer available");
        }
    }

    private WishlistResponse buildWishlistResponse(
            Wishlist wishlist) {

        List<WishlistItemResponse> items = wishlist.getItems()
                .stream()
                .map(this::toWishlistItemResponse)
                .toList();

        return new WishlistResponse(
                wishlist.getId(),
                items,
                items.size());
    }

    private WishlistItemResponse toWishlistItemResponse(
            WishlistItem item) {

        Product product = item.getProduct();

        BigDecimal price = product.getPrice();

        BigDecimal discount = product.getDiscountPercentage();

        BigDecimal discountedPrice = price
                .subtract(
                        price
                                .multiply(discount)
                                .divide(
                                        BigDecimal.valueOf(100),
                                        2,
                                        RoundingMode.HALF_UP))
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

        return new WishlistItemResponse(
                item.getId(),
                product.getId(),
                product.getName(),
                product.getBrand(),
                product.getSlug(),
                imageUrl,
                price,
                discount,
                discountedPrice);
    }
}