package com.sneakx.address;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneakx.address.dto.AddressRequest;
import com.sneakx.address.dto.AddressResponse;
import com.sneakx.address.dto.UpdateAddressRequest;
import com.sneakx.common.response.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

        private final AddressService addressService;

        public AddressController(AddressService addressService) {
                this.addressService = addressService;
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<AddressResponse>>> getAllAddresses(
                        Authentication authentication) {

                List<AddressResponse> addresses = addressService.getAllAddresses(
                                authentication.getName());

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Addresses fetched successfully",
                                                addresses));
        }

        @GetMapping("/{addressId}")
        public ResponseEntity<ApiResponse<AddressResponse>> getAddress(
                        Authentication authentication,
                        @PathVariable Long addressId) {

                AddressResponse address = addressService.getAddress(
                                authentication.getName(),
                                addressId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Address fetched successfully",
                                                address));
        }

        @PostMapping
        public ResponseEntity<ApiResponse<AddressResponse>> createAddress(
                        Authentication authentication,
                        @Valid @RequestBody AddressRequest request) {

                AddressResponse address = addressService.createAddress(
                                authentication.getName(),
                                request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(
                                                ApiResponse.success(
                                                                "Address created successfully",
                                                                address));
        }

        @PutMapping("/{addressId}")
        public ResponseEntity<ApiResponse<AddressResponse>> updateAddress(
                        Authentication authentication,
                        @PathVariable Long addressId,
                        @Valid @RequestBody UpdateAddressRequest request) {

                AddressResponse address = addressService.updateAddress(
                                authentication.getName(),
                                addressId,
                                request);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Address updated successfully",
                                                address));
        }

        @DeleteMapping("/{addressId}")
        public ResponseEntity<ApiResponse<Void>> deleteAddress(
                        Authentication authentication,
                        @PathVariable Long addressId) {

                addressService.deleteAddress(
                                authentication.getName(),
                                addressId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Address deleted successfully"));
        }

        @PatchMapping("/{addressId}/default")
        public ResponseEntity<ApiResponse<AddressResponse>> setDefaultAddress(
                        Authentication authentication,
                        @PathVariable Long addressId) {

                AddressResponse address = addressService.setDefaultAddress(
                                authentication.getName(),
                                addressId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Default address updated successfully",
                                                address));
        }
}