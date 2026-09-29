-- ============================================================
-- SneakX V11
-- Fresh 50-product catalog
--
-- Categories:
--   1. Running
--   2. Lifestyle
--   3. Basketball
--   4. Sports
--
-- Total products: 50
-- Running:     13
-- Lifestyle:   12
-- Basketball:  12
-- Sports:      13
--
-- IMPORTANT:
-- This migration intentionally replaces the current development
-- product catalog.
-- ============================================================
-- ============================================================
-- 1. REMOVE PRODUCT-DEPENDENT DEVELOPMENT DATA
-- ============================================================
-- This migration intentionally resets the development catalog.
-- Remove dependent records before deleting product/variant parents.
-- Order items reference products/variants with restrictive FKs.
DELETE FROM order_items;
-- Wishlist product references use CASCADE, but explicitly
-- clearing them keeps this reset deterministic.
DELETE FROM wishlists;
-- Cart items reference products/variants.
DELETE FROM cart_items;
-- Inventory references product_variants with ON DELETE RESTRICT.
-- It must be cleared before product variants are deleted.
DELETE FROM inventory;
-- Product images reference products.
-- Clear them explicitly before deleting the products.
DELETE FROM product_images;
-- Product variants reference products.
-- Clear them before deleting the products.
DELETE FROM product_variants;
-- ============================================================
-- 2. REMOVE ALL CURRENT PRODUCTS
-- ============================================================
DELETE FROM products;
-- ============================================================
-- 3. REMOVE THE OLD CATEGORY SET
-- ============================================================
DELETE FROM categories;
-- ============================================================
-- 4. CREATE THE FOUR NEW CATEGORIES
-- ============================================================
INSERT INTO categories (
        name,
        slug,
        description,
        is_active
    )
VALUES (
        'Running',
        'running',
        'Performance running sneakers designed for everyday runs, training and long-distance comfort.',
        1
    ),
    (
        'Lifestyle',
        'lifestyle',
        'Premium lifestyle sneakers designed for everyday wear, street style and casual comfort.',
        1
    ),
    (
        'Basketball',
        'basketball',
        'Court-ready sneakers engineered for traction, stability, support and explosive movement.',
        1
    ),
    (
        'Sports',
        'sports',
        'Versatile sports sneakers for training, gym sessions, fitness and active lifestyles.',
        1
    );
-- ============================================================
-- 5. RUNNING PRODUCTS — 13
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        brand,
        description,
        price,
        discount_percentage,
        is_active
    )
VALUES (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'AeroRun X1',
        'aerorun-x1',
        'SneakX',
        'Lightweight daily running sneaker with responsive cushioning and breathable mesh.',
        5499.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'Velocity Pro',
        'velocity-pro',
        'SneakX',
        'Performance-focused running sneaker designed for speed sessions and daily training.',
        6999.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'StrideMax 2.0',
        'stridemax-2',
        'SneakX',
        'Balanced running shoe with soft cushioning and dependable road grip.',
        5999.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'CloudSprint',
        'cloudsprint',
        'SneakX',
        'Responsive foam construction built for comfortable everyday running.',
        6499.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'Endurance Flow',
        'endurance-flow',
        'SneakX',
        'Long-distance running sneaker with enhanced arch support and breathable upper.',
        7499.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'RoadRunner Lite',
        'roadrunner-lite',
        'SneakX',
        'Lightweight road runner with flexible construction for daily mileage.',
        4799.00,
        8.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'PulseRun Elite',
        'pulserun-elite',
        'SneakX',
        'Premium running sneaker with responsive energy return and stable heel support.',
        8499.00,
        18.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'AirStride',
        'airstride',
        'SneakX',
        'Breathable everyday runner with soft foam cushioning and flexible forefoot.',
        5299.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'RunCore 360',
        'runcore-360',
        'SneakX',
        'All-round running sneaker offering stability, cushioning and durable traction.',
        6299.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'SwiftTrack',
        'swifttrack',
        'SneakX',
        'Fast and lightweight running shoe designed for tempo runs and track workouts.',
        7799.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'MotionRun 3',
        'motionrun-3',
        'SneakX',
        'Flexible running sneaker designed to support natural foot movement.',
        5699.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'UltraStride',
        'ultrastride',
        'SneakX',
        'Maximum-cushion running sneaker designed for extended comfort.',
        8999.00,
        20.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'running'
        ),
        'Daily Runner',
        'daily-runner',
        'SneakX',
        'Simple and comfortable everyday running sneaker for beginners and regular runners.',
        4499.00,
        8.00,
        1
    );
-- ============================================================
-- 6. LIFESTYLE PRODUCTS — 12
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        brand,
        description,
        price,
        discount_percentage,
        is_active
    )
VALUES (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Urban Classic',
        'urban-classic',
        'SneakX',
        'Clean everyday sneaker combining classic styling with modern comfort.',
        4499.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Street Force',
        'street-force',
        'SneakX',
        'Modern streetwear sneaker designed for everyday urban outfits.',
        5999.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Classic Low',
        'classic-low',
        'SneakX',
        'Minimal low-top sneaker with a clean silhouette for daily wear.',
        3999.00,
        8.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Metro Walk',
        'metro-walk',
        'SneakX',
        'Comfort-focused sneaker built for city walking and everyday movement.',
        4799.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Heritage One',
        'heritage-one',
        'SneakX',
        'Retro-inspired sneaker combining timeless styling with modern comfort.',
        6499.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Minimal White',
        'minimal-white',
        'SneakX',
        'Clean white sneaker designed to complement casual and smart-casual outfits.',
        5499.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Urban Edge',
        'urban-edge',
        'SneakX',
        'Contemporary sneaker with a bold silhouette for modern street style.',
        6999.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Canvas Street',
        'canvas-street',
        'SneakX',
        'Lightweight canvas sneaker for relaxed everyday styling.',
        3499.00,
        8.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Retro Court',
        'retro-court',
        'SneakX',
        'Court-inspired lifestyle sneaker with a vintage athletic aesthetic.',
        5799.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Luxe Step',
        'luxe-step',
        'SneakX',
        'Premium lifestyle sneaker designed with refined materials and a polished look.',
        7999.00,
        18.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'Everyday Flex',
        'everyday-flex',
        'SneakX',
        'Flexible everyday sneaker built for commuting, shopping and casual outings.',
        4299.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'lifestyle'
        ),
        'City Runner LX',
        'city-runner-lx',
        'SneakX',
        'Lifestyle runner blending athletic comfort with a contemporary urban design.',
        6299.00,
        12.00,
        1
    );
-- ============================================================
-- 7. BASKETBALL PRODUCTS — 12
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        brand,
        description,
        price,
        discount_percentage,
        is_active
    )
VALUES (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Court King High',
        'court-king-high',
        'SneakX',
        'High-top basketball sneaker with ankle support and court-ready traction.',
        8999.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Slam Dunk Pro',
        'slam-dunk-pro',
        'SneakX',
        'Impact-focused basketball sneaker designed for explosive jumps and hard landings.',
        9499.00,
        18.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Pivot Master',
        'pivot-master',
        'SneakX',
        'Low-profile basketball sneaker designed for quick cuts and agile movement.',
        7999.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Fast Break Elite',
        'fast-break-elite',
        'SneakX',
        'Court traction and responsive cushioning designed for fast-break play.',
        10499.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Block Zone Mid',
        'block-zone-mid',
        'SneakX',
        'Mid-top basketball sneaker providing balanced support for all-position players.',
        8499.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Hoop Force 2',
        'hoop-force-2',
        'SneakX',
        'Responsive court sneaker designed for guards and quick directional changes.',
        9299.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Rim Attack',
        'rim-attack',
        'SneakX',
        'Stable basketball sneaker engineered for aggressive drives and powerful finishes.',
        8799.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Air Court Max',
        'air-court-max',
        'SneakX',
        'Cushioned basketball sneaker designed to absorb repeated court impact.',
        9999.00,
        18.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Defender Mid',
        'defender-mid',
        'SneakX',
        'Supportive mid-top basketball sneaker designed for defensive movement.',
        8199.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'JumpCore Elite',
        'jumpcore-elite',
        'SneakX',
        'Responsive basketball sneaker with enhanced cushioning for explosive movement.',
        10999.00,
        20.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Court Motion',
        'court-motion',
        'SneakX',
        'Flexible basketball shoe designed for smooth transitions across the court.',
        7699.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'basketball'
        ),
        'Hoop Runner',
        'hoop-runner',
        'SneakX',
        'Lightweight basketball sneaker combining court speed with everyday comfort.',
        7399.00,
        8.00,
        1
    );
-- ============================================================
-- 8. SPORTS PRODUCTS — 13
-- ============================================================
INSERT INTO products (
        category_id,
        name,
        slug,
        brand,
        description,
        price,
        discount_percentage,
        is_active
    )
VALUES (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'Sport Max',
        'sport-max',
        'SneakX',
        'Performance-focused sports sneaker built for active training and daily workouts.',
        6999.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'Air Motion',
        'air-motion',
        'SneakX',
        'Versatile sports sneaker designed for active lifestyles and everyday movement.',
        6299.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'CrossFit Force',
        'crossfit-force',
        'SneakX',
        'Stable training sneaker designed for gym workouts and cross-training.',
        5799.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'PowerFlex Training',
        'powerflex-training',
        'SneakX',
        'Training sneaker providing stability and grip for high-intensity workouts.',
        6499.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'Agility Sprint',
        'agility-sprint',
        'SneakX',
        'Quick-pivot sports sneaker designed for agility and multidirectional movement.',
        6799.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'UltraFit Pro',
        'ultrafit-pro',
        'SneakX',
        'Breathable performance sneaker for gym sessions and active training.',
        5999.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'DuraStep Sport',
        'durastep-sport',
        'SneakX',
        'Durable sports sneaker with reinforced construction for demanding workouts.',
        5299.00,
        8.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'ForceFit Athletic',
        'forcefit-athletic',
        'SneakX',
        'High-support athletic sneaker designed for intense sports sessions.',
        6999.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'GymCore X',
        'gymcore-x',
        'SneakX',
        'Stable gym sneaker with flexible forefoot and durable outsole.',
        5499.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'ActivePulse',
        'activepulse',
        'SneakX',
        'Lightweight active sneaker designed for fitness and everyday training.',
        6199.00,
        12.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'FlexMotion Pro',
        'flexmotion-pro',
        'SneakX',
        'Flexible sports sneaker designed for natural movement during training.',
        5799.00,
        10.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'PowerStride',
        'powerstride',
        'SneakX',
        'Responsive training sneaker built for strength and conditioning sessions.',
        6699.00,
        15.00,
        1
    ),
    (
        (
            SELECT id
            FROM categories
            WHERE slug = 'sports'
        ),
        'ActiveCore Elite',
        'activecore-elite',
        'SneakX',
        'Premium all-purpose sports sneaker for demanding fitness routines.',
        7499.00,
        18.00,
        1
    );
-- ============================================================
-- 9. PRODUCT IMAGES
-- ============================================================
-- Running
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-1.png',
    1,
    0
FROM products
WHERE slug = 'aerorun-x1';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-2.png',
    1,
    0
FROM products
WHERE slug = 'velocity-pro';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-3.png',
    1,
    0
FROM products
WHERE slug = 'stridemax-2';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-4.png',
    1,
    0
FROM products
WHERE slug = 'cloudsprint';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-5.png',
    1,
    0
FROM products
WHERE slug = 'endurance-flow';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-6.png',
    1,
    0
FROM products
WHERE slug = 'roadrunner-lite';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-1.png',
    1,
    0
FROM products
WHERE slug = 'pulserun-elite';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-2.png',
    1,
    0
FROM products
WHERE slug = 'airstride';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-3.png',
    1,
    0
FROM products
WHERE slug = 'runcore-360';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-4.png',
    1,
    0
FROM products
WHERE slug = 'swifttrack';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-5.png',
    1,
    0
FROM products
WHERE slug = 'motionrun-3';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-6.png',
    1,
    0
FROM products
WHERE slug = 'ultrastride';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-1.png',
    1,
    0
FROM products
WHERE slug = 'daily-runner';
-- Lifestyle
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-1.png',
    1,
    0
FROM products
WHERE slug = 'urban-classic';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-2.png',
    1,
    0
FROM products
WHERE slug = 'street-force';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-3.png',
    1,
    0
FROM products
WHERE slug = 'classic-low';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-4.png',
    1,
    0
FROM products
WHERE slug = 'metro-walk';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-5.png',
    1,
    0
FROM products
WHERE slug = 'heritage-one';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-6.png',
    1,
    0
FROM products
WHERE slug = 'minimal-white';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-1.png',
    1,
    0
FROM products
WHERE slug = 'urban-edge';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-2.png',
    1,
    0
FROM products
WHERE slug = 'canvas-street';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-3.png',
    1,
    0
FROM products
WHERE slug = 'retro-court';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-4.png',
    1,
    0
FROM products
WHERE slug = 'luxe-step';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-5.png',
    1,
    0
FROM products
WHERE slug = 'everyday-flex';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-6.png',
    1,
    0
FROM products
WHERE slug = 'city-runner-lx';
-- Basketball
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-1.png',
    1,
    0
FROM products
WHERE slug = 'court-king-high';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-2.png',
    1,
    0
FROM products
WHERE slug = 'slam-dunk-pro';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-3.png',
    1,
    0
FROM products
WHERE slug = 'pivot-master';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-4.png',
    1,
    0
FROM products
WHERE slug = 'fast-break-elite';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-5.png',
    1,
    0
FROM products
WHERE slug = 'block-zone-mid';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-6.png',
    1,
    0
FROM products
WHERE slug = 'hoop-force-2';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-1.png',
    1,
    0
FROM products
WHERE slug = 'rim-attack';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-2.png',
    1,
    0
FROM products
WHERE slug = 'air-court-max';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-3.png',
    1,
    0
FROM products
WHERE slug = 'defender-mid';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-4.png',
    1,
    0
FROM products
WHERE slug = 'jumpcore-elite';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-5.png',
    1,
    0
FROM products
WHERE slug = 'court-motion';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Tranding/tranding-6.png',
    1,
    0
FROM products
WHERE slug = 'hoop-runner';
-- Sports
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-1.png',
    1,
    0
FROM products
WHERE slug = 'sport-max';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-2.png',
    1,
    0
FROM products
WHERE slug = 'air-motion';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-3.png',
    1,
    0
FROM products
WHERE slug = 'crossfit-force';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-4.png',
    1,
    0
FROM products
WHERE slug = 'powerflex-training';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-5.png',
    1,
    0
FROM products
WHERE slug = 'agility-sprint';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-6.png',
    1,
    0
FROM products
WHERE slug = 'ultrafit-pro';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-1.png',
    1,
    0
FROM products
WHERE slug = 'durastep-sport';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-2.png',
    1,
    0
FROM products
WHERE slug = 'forcefit-athletic';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-3.png',
    1,
    0
FROM products
WHERE slug = 'gymcore-x';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-4.png',
    1,
    0
FROM products
WHERE slug = 'activepulse';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-5.png',
    1,
    0
FROM products
WHERE slug = 'flexmotion-pro';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-6.png',
    1,
    0
FROM products
WHERE slug = 'powerstride';
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id,
    '/Mens/mens-1.png',
    1,
    0
FROM products
WHERE slug = 'activecore-elite';
-- ============================================================
-- 10. PRODUCT VARIANTS
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
    CONCAT('SNX-', UPPER(REPLACE(p.slug, '-', '')), '-7'),
    '7',
    20,
    NULL,
    1
FROM products p;
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    CONCAT('SNX-', UPPER(REPLACE(p.slug, '-', '')), '-8'),
    '8',
    25,
    NULL,
    1
FROM products p;
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    CONCAT('SNX-', UPPER(REPLACE(p.slug, '-', '')), '-9'),
    '9',
    30,
    NULL,
    1
FROM products p;
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    CONCAT('SNX-', UPPER(REPLACE(p.slug, '-', '')), '-10'),
    '10',
    25,
    NULL,
    1
FROM products p;
INSERT INTO product_variants (
        product_id,
        sku,
        size,
        stock_quantity,
        price_override,
        is_active
    )
SELECT p.id,
    CONCAT('SNX-', UPPER(REPLACE(p.slug, '-', '')), '-11'),
    '11',
    20,
    NULL,
    1
FROM products p;
-- ============================================================
-- 11. VERIFICATION
-- ============================================================
SELECT c.name AS category,
    COUNT(p.id) AS product_count
FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id,
    c.name
ORDER BY c.id;
SELECT COUNT(*) AS total_products
FROM products;
SELECT COUNT(*) AS total_variants
FROM product_variants;
SELECT COUNT(*) AS total_product_images
FROM product_images;
SELECT p.name,
    c.name AS category,
    p.price,
    p.discount_percentage,
    COUNT(pv.id) AS variant_count,
    COALESCE(SUM(pv.stock_quantity), 0) AS total_stock
FROM products p
    JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_variants pv ON pv.product_id = p.id
GROUP BY p.id,
    p.name,
    c.name,
    p.price,
    p.discount_percentage
ORDER BY c.id,
    p.id;