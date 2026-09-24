package com.sneakx.product;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

        Optional<Product> findBySlug(String slug);

        boolean existsBySlug(String slug);

        Page<Product> findByActiveTrue(Pageable pageable);

        Page<Product> findByCategoryIdAndActiveTrue(
                        Long categoryId,
                        Pageable pageable);

        Page<Product> findByBrandIgnoreCaseAndActiveTrue(
                        String brand,
                        Pageable pageable);
}