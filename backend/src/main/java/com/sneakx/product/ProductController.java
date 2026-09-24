package com.sneakx.product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

import com.sneakx.common.response.ApiResponse;
import com.sneakx.common.response.PageResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

        private final ProductService productService;

        public ProductController(ProductService productService) {
                this.productService = productService;
        }

        @GetMapping
        public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getAllProducts(
                        @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

                PageResponse<ProductResponse> products = productService.getAllActiveProducts(pageable);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Products fetched successfully",
                                                products));
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<ProductResponse>> getProductById(
                        @PathVariable Long id) {

                ProductResponse product = productService.getProductById(id);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Product fetched successfully",
                                                product));
        }

        @GetMapping("/slug/{slug}")
        public ResponseEntity<ApiResponse<ProductResponse>> getProductBySlug(
                        @PathVariable String slug) {

                ProductResponse product = productService.getProductBySlug(slug);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Product fetched successfully",
                                                product));
        }

        @GetMapping("/category/{categoryId}")
        public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProductsByCategory(
                        @PathVariable Long categoryId,
                        @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

                PageResponse<ProductResponse> products = productService.getProductsByCategory(
                                categoryId,
                                pageable);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Category products fetched successfully",
                                                products));
        }

        @GetMapping("/brand/{brand}")
        public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProductsByBrand(
                        @PathVariable String brand,
                        @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

                PageResponse<ProductResponse> products = productService.getProductsByBrand(
                                brand,
                                pageable);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Brand products fetched successfully",
                                                products));
        }

        @PostMapping
        public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
                        @Valid @RequestBody ProductRequest request) {

                ProductResponse product = productService.createProduct(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(
                                                ApiResponse.success(
                                                                "Product created successfully",
                                                                product));
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
                        @PathVariable Long id,
                        @Valid @RequestBody ProductRequest request) {

                ProductResponse product = productService.updateProduct(id, request);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Product updated successfully",
                                                product));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> deleteProduct(
                        @PathVariable Long id) {

                productService.deleteProduct(id);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Product deleted successfully"));
        }
}