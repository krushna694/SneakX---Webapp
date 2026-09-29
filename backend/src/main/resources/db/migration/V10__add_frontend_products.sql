-- ============================================================
-- SneakX V2
-- V10 — Add Original Frontend Products
-- ============================================================
--
-- Purpose:
--   Restore the 8 products that were previously hardcoded
--   in the React frontend.
--
-- Products:
--   1. Air Runner
--   2. Street Force
--   3. Urban Classic
--   4. Sport Max
--   5. Velocity X
--   6. Street Runner
--   7. Air Motion
--   8. Classic Low
--
-- Notes:
--   - Uses category slugs instead of hardcoded category IDs.
--   - Uses unique product slugs and SKUs.
--   - Adds product images.
--   - Adds sizes 7, 8, 9, 10 and 11.
--   - Existing products are NOT deleted or modified.
--   - Existing Nike/backend products remain untouched.
-- ============================================================
-- ============================================================
-- 1. RUNNING PRODUCTS
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Air Runner',
    'air-runner',
    'Lightweight running sneaker designed for everyday comfort, responsive cushioning and smooth performance.',
    'SneakX',
    4999.00,
    10.00,
    TRUE
FROM categories c
WHERE c.slug = 'running'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'air-runner'
    );
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Velocity X',
    'velocity-x',
    'Performance-focused running sneaker with a lightweight construction and responsive sole for faster movement.',
    'SneakX',
    5499.00,
    15.00,
    TRUE
FROM categories c
WHERE c.slug = 'running'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'velocity-x'
    );
-- ============================================================
-- 2. LIFESTYLE PRODUCTS
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Street Force',
    'street-force',
    'Bold lifestyle sneaker combining everyday comfort with a modern streetwear-inspired silhouette.',
    'SneakX',
    5999.00,
    10.00,
    TRUE
FROM categories c
WHERE c.slug = 'lifestyle'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'street-force'
    );
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Urban Classic',
    'urban-classic',
    'Classic everyday sneaker with a clean silhouette, versatile styling and comfortable construction.',
    'SneakX',
    4499.00,
    5.00,
    TRUE
FROM categories c
WHERE c.slug = 'lifestyle'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'urban-classic'
    );
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Street Runner',
    'street-runner',
    'Lifestyle sneaker inspired by running silhouettes, offering a balance of comfort and urban styling.',
    'SneakX',
    4799.00,
    10.00,
    TRUE
FROM categories c
WHERE c.slug = 'lifestyle'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'street-runner'
    );
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Classic Low',
    'classic-low',
    'Low-profile lifestyle sneaker with a minimal design for everyday casual wear.',
    'SneakX',
    3999.00,
    5.00,
    TRUE
FROM categories c
WHERE c.slug = 'lifestyle'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'classic-low'
    );
-- ============================================================
-- 3. SPORTS PRODUCTS
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Sport Max',
    'sport-max',
    'All-around sports sneaker designed for training, movement and everyday athletic activities.',
    'SneakX',
    6999.00,
    15.00,
    TRUE
FROM categories c
WHERE c.slug = 'sports'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'sport-max'
    );
INSERT INTO products (
        category_id,
        name,
        slug,
        description,
        brand,
        price,
        discount_percentage,
        is_active
    )
SELECT c.id,
    'Air Motion',
    'air-motion',
    'Dynamic sports sneaker engineered for comfortable movement and active everyday performance.',
    'SneakX',
    6299.00,
    10.00,
    TRUE
FROM categories c
WHERE c.slug = 'sports'
    AND NOT EXISTS (
        SELECT 1
        FROM products p
        WHERE p.slug = 'air-motion'
    );
-- ============================================================
-- 4. PRODUCT IMAGES
-- ============================================================
--
-- These paths should point to files inside:
--
-- frontend/public/
--
-- We are using the existing SneakX image structure where
-- product images are stored as public static assets.
--
-- IMPORTANT:
-- If your exact old image filenames differ, we can update
-- these URLs later without changing the product records.
-- ============================================================
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Tranding/tranding-1.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'air-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Mens/mens-1.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'street-force'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Mens/mens-2.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'urban-classic'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Tranding/tranding-2.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'sport-max'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Tranding/tranding-3.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'velocity-x'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Mens/mens-3.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'street-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Tranding/tranding-4.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'air-motion'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
INSERT INTO product_images (
        product_id,
        image_url,
        is_primary,
        display_order
    )
SELECT p.id,
    '/Mens/mens-4.png',
    TRUE,
    0
FROM products p
WHERE p.slug = 'classic-low'
    AND NOT EXISTS (
        SELECT 1
        FROM product_images pi
        WHERE pi.product_id = p.id
    );
-- ============================================================
-- 5. PRODUCT VARIANTS
-- ============================================================
--
-- Each product receives:
--
--   Size 7
--   Size 8
--   Size 9
--   Size 10
--   Size 11
--
-- Stock is kept at variant level.
--
-- We intentionally use fixed stock values instead of RAND().
-- This makes Flyway migrations deterministic and reproducible.
-- ============================================================
-- AIR RUNNER
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    CONCAT('SNX-AIR-RUN-007'),
    '7',
    20,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-RUN-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-RUN-008',
    '8',
    25,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-RUN-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-RUN-009',
    '9',
    30,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-RUN-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-RUN-010',
    '10',
    25,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-RUN-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-RUN-011',
    '11',
    15,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-RUN-011'
    );
-- ============================================================
-- STREET FORCE
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-FOR-007',
    '7',
    18,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-force'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-FOR-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-FOR-008',
    '8',
    24,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-force'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-FOR-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-FOR-009',
    '9',
    30,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-force'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-FOR-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-FOR-010',
    '10',
    22,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-force'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-FOR-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-FOR-011',
    '11',
    14,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-force'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-FOR-011'
    );
-- ============================================================
-- URBAN CLASSIC
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-URB-CLS-007',
    '7',
    20,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'urban-classic'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-URB-CLS-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-URB-CLS-008',
    '8',
    28,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'urban-classic'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-URB-CLS-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-URB-CLS-009',
    '9',
    32,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'urban-classic'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-URB-CLS-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-URB-CLS-010',
    '10',
    25,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'urban-classic'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-URB-CLS-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-URB-CLS-011',
    '11',
    16,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'urban-classic'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-URB-CLS-011'
    );
-- ============================================================
-- SPORT MAX
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-SPT-MAX-007',
    '7',
    15,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'sport-max'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-SPT-MAX-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-SPT-MAX-008',
    '8',
    22,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'sport-max'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-SPT-MAX-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-SPT-MAX-009',
    '9',
    28,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'sport-max'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-SPT-MAX-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-SPT-MAX-010',
    '10',
    20,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'sport-max'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-SPT-MAX-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-SPT-MAX-011',
    '11',
    12,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'sport-max'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-SPT-MAX-011'
    );
-- ============================================================
-- VELOCITY X
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-VEL-X-007',
    '7',
    18,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'velocity-x'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-VEL-X-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-VEL-X-008',
    '8',
    25,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'velocity-x'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-VEL-X-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-VEL-X-009',
    '9',
    30,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'velocity-x'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-VEL-X-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-VEL-X-010',
    '10',
    23,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'velocity-x'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-VEL-X-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-VEL-X-011',
    '11',
    15,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'velocity-x'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-VEL-X-011'
    );
-- ============================================================
-- STREET RUNNER
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-RUN-007',
    '7',
    20,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-RUN-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-RUN-008',
    '8',
    26,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-RUN-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-RUN-009',
    '9',
    31,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-RUN-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-RUN-010',
    '10',
    24,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-RUN-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-STR-RUN-011',
    '11',
    14,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'street-runner'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-STR-RUN-011'
    );
-- ============================================================
-- AIR MOTION
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-MOT-007',
    '7',
    16,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-motion'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-MOT-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-MOT-008',
    '8',
    23,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-motion'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-MOT-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-MOT-009',
    '9',
    29,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-motion'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-MOT-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-MOT-010',
    '10',
    21,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-motion'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-MOT-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-AIR-MOT-011',
    '11',
    13,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'air-motion'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-AIR-MOT-011'
    );
-- ============================================================
-- CLASSIC LOW
-- ============================================================
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-CLS-LOW-007',
    '7',
    22,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'classic-low'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-CLS-LOW-007'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-CLS-LOW-008',
    '8',
    30,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'classic-low'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-CLS-LOW-008'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-CLS-LOW-009',
    '9',
    35,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'classic-low'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-CLS-LOW-009'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-CLS-LOW-010',
    '10',
    28,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'classic-low'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-CLS-LOW-010'
    );
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    'SNX-CLS-LOW-011',
    '11',
    18,
    NULL,
    TRUE
FROM products p
WHERE p.slug = 'classic-low'
    AND NOT EXISTS (
        SELECT 1
        FROM product_variants v
        WHERE v.sku = 'SNX-CLS-LOW-011'
    );
-- ============================================================
-- 6. VERIFICATION
-- ============================================================
--
-- These SELECT statements are only for manual verification
-- when running the migration manually.
--
-- Flyway itself does not need them.
-- ============================================================
SELECT p.id,
    p.name,
    p.slug,
    c.name AS category,
    p.brand,
    p.price,
    p.discount_percentage,
    p.is_active
FROM products p
    JOIN categories c ON c.id = p.category_id
WHERE p.slug IN (
        'air-runner',
        'street-force',
        'urban-classic',
        'sport-max',
        'velocity-x',
        'street-runner',
        'air-motion',
        'classic-low'
    )
ORDER BY p.id;
SELECT p.name,
    COUNT(v.id) AS variant_count,
    SUM(v.stock_quantity) AS total_stock
FROM products p
    LEFT JOIN product_variants v ON v.product_id = p.id
WHERE p.slug IN (
        'air-runner',
        'street-force',
        'urban-classic',
        'sport-max',
        'velocity-x',
        'street-runner',
        'air-motion',
        'classic-low'
    )
GROUP BY p.id,
    p.name
ORDER BY p.id;