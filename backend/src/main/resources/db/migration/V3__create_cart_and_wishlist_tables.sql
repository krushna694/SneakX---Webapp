-- =========================================================
-- V3 - CART AND WISHLIST MODULE
-- =========================================================

-- =========================================================
-- CARTS
-- One active cart per user
-- =========================================================

CREATE TABLE carts (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_carts_user
        UNIQUE (user_id),

    CONSTRAINT fk_carts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_carts_user (user_id)
) ENGINE=InnoDB;


-- =========================================================
-- CART ITEMS
-- Each cart item represents one product variant
-- =========================================================

CREATE TABLE cart_items (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cart_id BIGINT NOT NULL,
    variant_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_cart_items_cart_variant
        UNIQUE (cart_id, variant_id),

    CONSTRAINT fk_cart_items_cart
        FOREIGN KEY (cart_id)
        REFERENCES carts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_cart_items_variant
        FOREIGN KEY (variant_id)
        REFERENCES product_variants(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_cart_items_quantity
        CHECK (quantity > 0),

    INDEX idx_cart_items_cart (cart_id),
    INDEX idx_cart_items_variant (variant_id)
) ENGINE=InnoDB;


-- =========================================================
-- WISHLISTS
-- One wishlist per user
-- =========================================================

CREATE TABLE wishlists (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_wishlists_user
        UNIQUE (user_id),

    CONSTRAINT fk_wishlists_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_wishlists_user (user_id)
) ENGINE=InnoDB;


-- =========================================================
-- WISHLIST ITEMS
-- Wishlist operates at product level
-- =========================================================

CREATE TABLE wishlist_items (
    id BIGINT NOT NULL AUTO_INCREMENT,
    wishlist_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_wishlist_items_wishlist_product
        UNIQUE (wishlist_id, product_id),

    CONSTRAINT fk_wishlist_items_wishlist
        FOREIGN KEY (wishlist_id)
        REFERENCES wishlists(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_wishlist_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_wishlist_items_wishlist (wishlist_id),
    INDEX idx_wishlist_items_product (product_id)
) ENGINE=InnoDB;