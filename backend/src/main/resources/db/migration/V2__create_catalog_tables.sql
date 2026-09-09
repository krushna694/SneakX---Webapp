-- ==========================================
-- SneakX V2 - Catalog
-- Categories, Products, Images and Variants
-- ==========================================
CREATE TABLE categories (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    description VARCHAR(1000),
    image_url VARCHAR(1000),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_categories_name UNIQUE (name),
    CONSTRAINT uk_categories_slug UNIQUE (slug)
) ENGINE = InnoDB;
CREATE TABLE products (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL,
    description TEXT,
    brand VARCHAR(150) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_products_slug UNIQUE (slug),
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_products_price CHECK (price >= 0),
    CONSTRAINT chk_products_discount CHECK (
        discount_percentage >= 0
        AND discount_percentage <= 100
    ),
    INDEX idx_products_category (category_id),
    INDEX idx_products_brand (brand),
    INDEX idx_products_active (is_active)
) ENGINE = InnoDB;
CREATE TABLE product_images (
    id BIGINT NOT NULL AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_product_images_order CHECK (display_order >= 0),
    INDEX idx_product_images_product (product_id)
) ENGINE = InnoDB;
CREATE TABLE product_variants (
    id BIGINT NOT NULL AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    sku VARCHAR(100) NOT NULL,
    size VARCHAR(30) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    price_override DECIMAL(12, 2),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_product_variants_sku UNIQUE (sku),
    CONSTRAINT uk_product_variants_product_size UNIQUE (product_id, size),
    CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_product_variants_stock CHECK (stock_quantity >= 0),
    CONSTRAINT chk_product_variants_price CHECK (
        price_override IS NULL
        OR price_override >= 0
    ),
    INDEX idx_product_variants_product (product_id),
    INDEX idx_product_variants_size (size),
    INDEX idx_product_variants_active (is_active)
) ENGINE = InnoDB;