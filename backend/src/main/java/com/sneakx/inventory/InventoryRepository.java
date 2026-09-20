package com.sneakx.inventory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByVariantId(Long variantId);

    boolean existsByVariantId(Long variantId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
                SELECT i
                FROM Inventory i
                WHERE i.variant.id = :variantId
            """)
    Optional<Inventory> findByVariantIdForUpdate(
            @Param("variantId") Long variantId);
}