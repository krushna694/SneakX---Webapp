package com.sneakx.product;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sneakx.category.Category;
import com.sneakx.category.CategoryRepository;
import com.sneakx.common.exception.BadRequestException;
import com.sneakx.common.exception.ResourceNotFoundException;

import jakarta.persistence.EntityManager;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final EntityManager entityManager;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            EntityManager entityManager) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.entityManager = entityManager;
    }

    // ==========================================
    // GET ALL ACTIVE PRODUCTS
    // ==========================================

    @Transactional(readOnly = true)
    public List<ProductResponse> getAllActiveProducts() {

        return productRepository
                .findByActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET PRODUCT BY ID
    // ==========================================

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + id));

        return toResponse(product);
    }

    // ==========================================
    // GET PRODUCT BY SLUG
    // ==========================================

    @Transactional(readOnly = true)
    public ProductResponse getProductBySlug(String slug) {

        Product product = productRepository.findBySlug(
                normalizeSlug(slug))
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with slug: " + slug));

        return toResponse(product);
    }

    // ==========================================
    // GET PRODUCTS BY CATEGORY
    // ==========================================

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategory(Long categoryId) {

        ensureCategoryExists(categoryId);

        return productRepository
                .findByCategoryIdAndActiveTrueOrderByCreatedAtDesc(
                        categoryId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET PRODUCTS BY BRAND
    // ==========================================

    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByBrand(String brand) {

        return productRepository
                .findByBrandIgnoreCaseAndActiveTrueOrderByCreatedAtDesc(
                        brand.trim())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // CREATE PRODUCT
    // ==========================================

    public ProductResponse createProduct(ProductRequest request) {

        String slug = normalizeSlug(request.getSlug());

        if (productRepository.existsBySlug(slug)) {
            throw new BadRequestException(
                    "A product with this slug already exists");
        }

        Category category = getCategoryForWrite(
                request.getCategoryId());

        validateVariants(request.getVariants());

        Product product = new Product();

        product.setCategory(category);
        product.setName(request.getName().trim());
        product.setSlug(slug);
        product.setDescription(
                normalizeOptional(request.getDescription()));
        product.setBrand(request.getBrand().trim());

        product.setPrice(
                request.getPrice()
                        .setScale(2, RoundingMode.HALF_UP));

        product.setDiscountPercentage(
                request.getDiscountPercentage()
                        .setScale(2, RoundingMode.HALF_UP));

        if (request.getActive() != null) {
            product.setActive(request.getActive());
        }

        addImages(product, request);
        addVariants(product, request);

        Product savedProduct = productRepository.save(product);

        return toResponse(savedProduct);
    }

    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    public ProductResponse updateProduct(
            Long id,
            ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + id));

        String slug = normalizeSlug(request.getSlug());

        if (!product.getSlug().equals(slug)
                && productRepository.existsBySlug(slug)) {

            throw new BadRequestException(
                    "A product with this slug already exists");
        }

        Category category = getCategoryForWrite(
                request.getCategoryId());

        validateVariants(request.getVariants());

        // ==========================================
        // UPDATE BASIC PRODUCT INFORMATION
        // ==========================================

        product.setCategory(category);
        product.setName(request.getName().trim());
        product.setSlug(slug);

        product.setDescription(
                normalizeOptional(request.getDescription()));

        product.setBrand(request.getBrand().trim());

        product.setPrice(
                request.getPrice()
                        .setScale(2, RoundingMode.HALF_UP));

        product.setDiscountPercentage(
                request.getDiscountPercentage()
                        .setScale(2, RoundingMode.HALF_UP));

        if (request.getActive() != null) {
            product.setActive(request.getActive());
        }

        // ==========================================
        // REMOVE OLD IMAGES AND VARIANTS
        // ==========================================

        product.getImages().clear();
        product.getVariants().clear();

        /*
         * Important:
         *
         * ProductImage and ProductVariant use orphanRemoval=true.
         * Hibernate needs to flush the DELETE operations for the
         * existing child records before inserting the new records.
         *
         * Without this flush, updating a product with the same
         * size/SKU can cause a unique constraint violation.
         */

        entityManager.flush();

        // ==========================================
        // ADD UPDATED IMAGES AND VARIANTS
        // ==========================================

        addImages(product, request);
        addVariants(product, request);

        Product savedProduct = productRepository.save(product);

        return toResponse(savedProduct);
    }

    // ==========================================
    // SOFT DELETE
    // ==========================================

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + id));

        product.setActive(false);

        product.getImages()
                .forEach(image -> image.setPrimary(false));

        product.getVariants()
                .forEach(variant -> variant.setActive(false));

        productRepository.save(product);
    }

    // ==========================================
    // CATEGORY VALIDATION
    // ==========================================

    private Category getCategoryForWrite(Long categoryId) {

        return categoryRepository.findById(categoryId)
                .filter(Category::isActive)
                .orElseThrow(() -> new BadRequestException(
                        "Category not found or inactive with id: "
                                + categoryId));
    }

    private void ensureCategoryExists(Long categoryId) {

        if (!categoryRepository.existsById(categoryId)) {

            throw new ResourceNotFoundException(
                    "Category not found with id: " + categoryId);
        }
    }

    // ==========================================
    // IMAGE HANDLING
    // ==========================================

    private void addImages(
            Product product,
            ProductRequest request) {

        if (request.getImages() == null) {
            return;
        }

        long primaryCount = request.getImages()
                .stream()
                .filter(ProductRequest.ProductImageRequest::isPrimary)
                .count();

        if (primaryCount > 1) {

            throw new BadRequestException(
                    "A product can have only one primary image");
        }

        for (ProductRequest.ProductImageRequest imageRequest : request.getImages()) {

            ProductImage image = new ProductImage();

            image.setImageUrl(
                    imageRequest.getImageUrl().trim());

            image.setDisplayOrder(
                    imageRequest.getDisplayOrder());

            image.setPrimary(
                    imageRequest.isPrimary());

            product.addImage(image);
        }
    }

    // ==========================================
    // VARIANT HANDLING
    // ==========================================

    private void addVariants(
            Product product,
            ProductRequest request) {

        if (request.getVariants() == null) {
            return;
        }

        for (ProductRequest.ProductVariantRequest variantRequest : request.getVariants()) {

            ProductVariant variant = new ProductVariant();

            variant.setSku(
                    variantRequest.getSku().trim());

            variant.setSize(
                    variantRequest.getSize().trim());

            variant.setStockQuantity(
                    variantRequest.getStockQuantity());

            if (variantRequest.getPriceOverride() != null) {

                variant.setPriceOverride(
                        variantRequest.getPriceOverride()
                                .setScale(
                                        2,
                                        RoundingMode.HALF_UP));
            }

            if (variantRequest.getActive() != null) {

                variant.setActive(
                        variantRequest.getActive());
            }

            product.addVariant(variant);
        }
    }

    // ==========================================
    // VARIANT VALIDATION
    // ==========================================

    private void validateVariants(
            List<ProductRequest.ProductVariantRequest> variants) {

        if (variants == null || variants.isEmpty()) {
            return;
        }

        Set<String> skus = new HashSet<>();
        Set<String> sizes = new HashSet<>();

        for (ProductRequest.ProductVariantRequest variant : variants) {

            String sku = variant.getSku()
                    .trim()
                    .toLowerCase();

            String size = variant.getSize()
                    .trim()
                    .toLowerCase();

            // Duplicate SKU inside the same request
            if (!skus.add(sku)) {

                throw new BadRequestException(
                        "Duplicate SKU in product variants: "
                                + variant.getSku());
            }

            // Duplicate size inside the same request
            if (!sizes.add(size)) {

                throw new BadRequestException(
                        "Duplicate size in product variants: "
                                + variant.getSize());
            }
        }
    }

    // ==========================================
    // RESPONSE MAPPING
    // ==========================================

    private ProductResponse toResponse(Product product) {

        BigDecimal discountedPrice = calculateDiscountedPrice(
                product.getPrice(),
                product.getDiscountPercentage());

        List<ProductResponse.ProductImageResponse> images = product.getImages()
                .stream()
                .map(image -> new ProductResponse.ProductImageResponse(
                        image.getId(),
                        image.getImageUrl(),
                        image.getDisplayOrder(),
                        image.isPrimary()))
                .toList();

        List<ProductResponse.ProductVariantResponse> variants = product.getVariants()
                .stream()
                .map(variant -> new ProductResponse.ProductVariantResponse(
                        variant.getId(),
                        variant.getSku(),
                        variant.getSize(),
                        variant.getStockQuantity(),
                        variant.getPriceOverride(),
                        variant.isActive()))
                .toList();

        return new ProductResponse(
                product.getId(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getName(),
                product.getSlug(),
                product.getDescription(),
                product.getBrand(),
                product.getPrice(),
                product.getDiscountPercentage(),
                discountedPrice,
                product.isActive(),
                images,
                variants,
                product.getCreatedAt(),
                product.getUpdatedAt());
    }

    // ==========================================
    // DISCOUNT CALCULATION
    // ==========================================

    private BigDecimal calculateDiscountedPrice(
            BigDecimal price,
            BigDecimal discountPercentage) {

        BigDecimal discount = price.multiply(discountPercentage)
                .divide(
                        BigDecimal.valueOf(100),
                        2,
                        RoundingMode.HALF_UP);

        return price.subtract(discount)
                .setScale(2, RoundingMode.HALF_UP);
    }

    // ==========================================
    // NORMALIZATION
    // ==========================================

    private String normalizeSlug(String value) {

        return value.trim().toLowerCase();
    }

    private String normalizeOptional(String value) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty() ? null : trimmed;
    }
}