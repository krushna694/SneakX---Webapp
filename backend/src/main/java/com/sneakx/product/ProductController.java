package com.sneakx.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ==========================================
    // PUBLIC PRODUCT APIs
    // ==========================================

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllActiveProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductResponse> getProductBySlug(
            @PathVariable String slug) {

        return ResponseEntity.ok(
                productService.getProductBySlug(slug));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(
            @PathVariable Long categoryId) {

        return ResponseEntity.ok(
                productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<ProductResponse>> getProductsByBrand(
            @PathVariable String brand) {

        return ResponseEntity.ok(
                productService.getProductsByBrand(brand));
    }

    // ==========================================
    // ADMIN / MANAGEMENT APIs
    // ==========================================

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {

        ProductResponse product = productService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }
}