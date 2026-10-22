package com.sneakx.inventory;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sneakx.product.ProductVariant;
import com.sneakx.product.ProductVariantRepository;

import jakarta.persistence.EntityNotFoundException;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

        @Mock
        private InventoryRepository inventoryRepository;

        @Mock
        private ProductVariantRepository productVariantRepository;

        @InjectMocks
        private InventoryService inventoryService;

        private ProductVariant variant;

        private Inventory inventory;

        @BeforeEach
        void setUp() {
                variant = org.mockito.Mockito.mock(ProductVariant.class);

                inventory = new Inventory();
                inventory.setVariant(variant);
                inventory.setAvailableQuantity(10);
                inventory.setReservedQuantity(0);
        }

        @Test
        void reserveStockShouldMoveAvailableStockToReservedStock() {
                when(inventoryRepository.findByVariantIdForUpdate(1L))
                                .thenReturn(Optional.of(inventory));
                when(inventoryRepository.save(any(Inventory.class)))
                                .thenReturn(inventory);

                inventoryService.reserveStock(1L, 3);

                assertEquals(7, inventory.getAvailableQuantity());
                assertEquals(3, inventory.getReservedQuantity());
                verify(inventoryRepository).save(inventory);
        }

        @Test
        void releaseStockShouldRestoreAvailableStock() {
                inventory.setAvailableQuantity(7);
                inventory.setReservedQuantity(3);

                when(inventoryRepository.findByVariantIdForUpdate(1L))
                                .thenReturn(Optional.of(inventory));
                when(inventoryRepository.save(any(Inventory.class)))
                                .thenReturn(inventory);

                inventoryService.releaseStock(1L, 2);

                assertEquals(9, inventory.getAvailableQuantity());
                assertEquals(1, inventory.getReservedQuantity());
        }

        @Test
        void confirmReservedStockShouldRemoveReservedQuantity() {
                inventory.setReservedQuantity(3);

                when(inventoryRepository.findByVariantIdForUpdate(1L))
                                .thenReturn(Optional.of(inventory));
                when(inventoryRepository.save(any(Inventory.class)))
                                .thenReturn(inventory);

                inventoryService.confirmReservedStock(1L, 2);

                assertEquals(10, inventory.getAvailableQuantity());
                assertEquals(1, inventory.getReservedQuantity());
        }

        @Test
        void reserveStockShouldRejectInsufficientStock() {
                when(inventoryRepository.findByVariantIdForUpdate(1L))
                                .thenReturn(Optional.of(inventory));

                assertThrows(
                                IllegalStateException.class,
                                () -> inventoryService.reserveStock(1L, 11));

                assertEquals(10, inventory.getAvailableQuantity());
                assertEquals(0, inventory.getReservedQuantity());
                verify(inventoryRepository, never()).save(any(Inventory.class));
        }

        @Test
        void releaseStockShouldRejectQuantityAboveReservedStock() {
                when(inventoryRepository.findByVariantIdForUpdate(1L))
                                .thenReturn(Optional.of(inventory));

                assertThrows(
                                IllegalStateException.class,
                                () -> inventoryService.releaseStock(1L, 1));

                assertEquals(10, inventory.getAvailableQuantity());
                assertEquals(0, inventory.getReservedQuantity());
                verify(inventoryRepository, never()).save(any(Inventory.class));
        }

        @Test
        void stockOperationsShouldRejectZeroOrNegativeQuantities() {
                assertThrows(
                                IllegalArgumentException.class,
                                () -> inventoryService.reserveStock(1L, 0));

                assertThrows(
                                IllegalArgumentException.class,
                                () -> inventoryService.releaseStock(1L, -1));

                assertThrows(
                                IllegalArgumentException.class,
                                () -> inventoryService.confirmReservedStock(1L, 0));
        }

        @Test
        void reserveStockShouldFailWhenInventoryDoesNotExist() {
                when(inventoryRepository.findByVariantIdForUpdate(99L))
                                .thenReturn(Optional.empty());

                assertThrows(
                                EntityNotFoundException.class,
                                () -> inventoryService.reserveStock(99L, 1));
        }
}
