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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<List<AddressResponse>> getAllAddresses(
            Authentication authentication) {

        return ResponseEntity.ok(
                addressService.getAllAddresses(
                        authentication.getName()));
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressResponse> getAddress(
            Authentication authentication,
            @PathVariable Long addressId) {

        return ResponseEntity.ok(
                addressService.getAddress(
                        authentication.getName(),
                        addressId));
    }

    @PostMapping
    public ResponseEntity<AddressResponse> createAddress(
            Authentication authentication,
            @Valid @RequestBody AddressRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        addressService.createAddress(
                                authentication.getName(),
                                request));
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> updateAddress(
            Authentication authentication,
            @PathVariable Long addressId,
            @Valid @RequestBody UpdateAddressRequest request) {

        return ResponseEntity.ok(
                addressService.updateAddress(
                        authentication.getName(),
                        addressId,
                        request));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(
            Authentication authentication,
            @PathVariable Long addressId) {

        addressService.deleteAddress(
                authentication.getName(),
                addressId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{addressId}/default")
    public ResponseEntity<AddressResponse> setDefaultAddress(
            Authentication authentication,
            @PathVariable Long addressId) {

        return ResponseEntity.ok(
                addressService.setDefaultAddress(
                        authentication.getName(),
                        addressId));
    }
}