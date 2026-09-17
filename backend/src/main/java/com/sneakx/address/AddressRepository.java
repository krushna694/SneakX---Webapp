package com.sneakx.address;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository
        extends JpaRepository<Address, Long> {

    List<Address> findByUserIdOrderByDefaultAddressDescCreatedAtDesc(
            Long userId);

    Optional<Address> findByIdAndUserId(
            Long id,
            Long userId);

    Optional<Address> findByUserIdAndDefaultAddressTrue(
            Long userId);

    boolean existsByIdAndUserId(
            Long id,
            Long userId);

    long countByUserId(Long userId);
}