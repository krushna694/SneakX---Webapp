package com.sneakx.address;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sneakx.address.dto.AddressRequest;
import com.sneakx.address.dto.AddressResponse;
import com.sneakx.address.dto.UpdateAddressRequest;
import com.sneakx.common.exception.ResourceNotFoundException;
import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(
            AddressRepository addressRepository,
            UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<AddressResponse> getAllAddresses(String email) {

        User user = getUserByEmail(email);

        return addressRepository
                .findByUserIdOrderByDefaultAddressDescCreatedAtDesc(
                        user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public AddressResponse getAddress(
            String email,
            Long addressId) {

        User user = getUserByEmail(email);

        Address address = addressRepository
                .findByIdAndUserId(
                        addressId,
                        user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found"));

        return toResponse(address);
    }

    @Transactional
    public AddressResponse createAddress(
            String email,
            AddressRequest request) {

        User user = getUserByEmail(email);

        long addressCount = addressRepository.countByUserId(
                user.getId());

        Address address = new Address();

        address.setUser(user);
        applyRequest(address, request);

        /*
         * If this is the user's first address,
         * automatically make it the default address.
         */
        boolean shouldBeDefault = addressCount == 0 ||
                request.isDefaultAddress();

        if (shouldBeDefault) {

            clearDefaultAddress(user.getId());

            address.setDefaultAddress(true);
        }

        Address savedAddress = addressRepository.save(address);

        return toResponse(savedAddress);
    }

    @Transactional
    public AddressResponse updateAddress(
            String email,
            Long addressId,
            UpdateAddressRequest request) {

        User user = getUserByEmail(email);

        Address address = addressRepository
                .findByIdAndUserId(
                        addressId,
                        user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found"));

        applyRequest(address, request);

        if (request.isDefaultAddress()) {

            clearDefaultAddress(user.getId());

            address.setDefaultAddress(true);

        } else if (address.isDefaultAddress()) {

            /*
             * Do not allow the current default address
             * to become non-default without assigning
             * another default address.
             */
            address.setDefaultAddress(true);
        }

        Address updatedAddress = addressRepository.save(address);

        return toResponse(updatedAddress);
    }

    @Transactional
    public void deleteAddress(
            String email,
            Long addressId) {

        User user = getUserByEmail(email);

        Address address = addressRepository
                .findByIdAndUserId(
                        addressId,
                        user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found"));

        boolean wasDefault = address.isDefaultAddress();

        addressRepository.delete(address);

        /*
         * If the deleted address was default,
         * promote the newest remaining address.
         */
        if (wasDefault) {

            List<Address> remaining = addressRepository
                    .findByUserIdOrderByDefaultAddressDescCreatedAtDesc(
                            user.getId());

            if (!remaining.isEmpty()) {

                Address newDefault = remaining.get(0);

                newDefault.setDefaultAddress(true);

                addressRepository.save(newDefault);
            }
        }
    }

    @Transactional
    public AddressResponse setDefaultAddress(
            String email,
            Long addressId) {

        User user = getUserByEmail(email);

        Address address = addressRepository
                .findByIdAndUserId(
                        addressId,
                        user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found"));

        clearDefaultAddress(user.getId());

        address.setDefaultAddress(true);

        Address savedAddress = addressRepository.save(address);

        return toResponse(savedAddress);
    }

    private void clearDefaultAddress(Long userId) {

        addressRepository
                .findByUserIdAndDefaultAddressTrue(userId)
                .ifPresent(address -> {

                    address.setDefaultAddress(false);

                    addressRepository.save(address);
                });
    }

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found"));
    }

    private void applyRequest(
            Address address,
            AddressRequest request) {

        address.setFullName(
                request.getFullName().trim());

        address.setPhone(
                request.getPhone().trim());

        address.setAddressLine1(
                request.getAddressLine1().trim());

        address.setAddressLine2(
                normalizeOptional(
                        request.getAddressLine2()));

        address.setCity(
                request.getCity().trim());

        address.setState(
                request.getState().trim());

        address.setPostalCode(
                request.getPostalCode().trim());

        address.setCountry(
                request.getCountry() == null ||
                        request.getCountry().isBlank()
                                ? "India"
                                : request.getCountry().trim());

        address.setAddressType(
                request.getAddressType());
    }

    private void applyRequest(
            Address address,
            UpdateAddressRequest request) {

        address.setFullName(
                request.getFullName().trim());

        address.setPhone(
                request.getPhone().trim());

        address.setAddressLine1(
                request.getAddressLine1().trim());

        address.setAddressLine2(
                normalizeOptional(
                        request.getAddressLine2()));

        address.setCity(
                request.getCity().trim());

        address.setState(
                request.getState().trim());

        address.setPostalCode(
                request.getPostalCode().trim());

        address.setCountry(
                request.getCountry() == null ||
                        request.getCountry().isBlank()
                                ? "India"
                                : request.getCountry().trim());

        address.setAddressType(
                request.getAddressType());
    }

    private String normalizeOptional(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

    private AddressResponse toResponse(
            Address address) {

        return new AddressResponse(
                address.getId(),
                address.getFullName(),
                address.getPhone(),
                address.getAddressLine1(),
                address.getAddressLine2(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry(),
                address.getAddressType(),
                address.isDefaultAddress(),
                address.getCreatedAt(),
                address.getUpdatedAt());
    }
}