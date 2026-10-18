INSERT INTO inventory (
        variant_id,
        available_quantity,
        reserved_quantity
    )
SELECT pv.id,
    pv.stock_quantity,
    0
FROM product_variants pv
    LEFT JOIN inventory i ON i.variant_id = pv.id
WHERE i.id IS NULL;