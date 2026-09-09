package com.sneakx.category;

import com.sneakx.common.exception.BadRequestException;
import com.sneakx.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<Category> getAllActiveCategories() {
        return categoryRepository.findByActiveTrueOrderByNameAsc();
    }

    @Transactional(readOnly = true)
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public Category getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found with slug: " + slug));
    }

    public Category createCategory(CategoryRequest request) {

        String name = normalize(request.getName());
        String slug = normalizeSlug(request.getSlug());

        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new BadRequestException(
                    "A category with this name already exists");
        }

        if (categoryRepository.existsBySlug(slug)) {
            throw new BadRequestException(
                    "A category with this slug already exists");
        }

        Category category = new Category();

        category.setName(name);
        category.setSlug(slug);
        category.setDescription(normalizeOptional(request.getDescription()));
        category.setImageUrl(normalizeOptional(request.getImageUrl()));

        if (request.getActive() != null) {
            category.setActive(request.getActive());
        }

        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryRequest request) {

        Category category = getCategoryById(id);

        String name = normalize(request.getName());
        String slug = normalizeSlug(request.getSlug());

        if (!category.getName().equalsIgnoreCase(name)
                && categoryRepository.existsByNameIgnoreCase(name)) {

            throw new BadRequestException(
                    "A category with this name already exists");
        }

        if (!category.getSlug().equals(slug)
                && categoryRepository.existsBySlug(slug)) {

            throw new BadRequestException(
                    "A category with this slug already exists");
        }

        category.setName(name);
        category.setSlug(slug);
        category.setDescription(
                normalizeOptional(request.getDescription()));
        category.setImageUrl(
                normalizeOptional(request.getImageUrl()));

        if (request.getActive() != null) {
            category.setActive(request.getActive());
        }

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {

        Category category = getCategoryById(id);

        /*
         * Products reference categories.
         *
         * Instead of physically deleting a category,
         * deactivate it so existing product relationships
         * remain safe.
         */
        category.setActive(false);

        categoryRepository.save(category);
    }

    private String normalize(String value) {
        return value.trim();
    }

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