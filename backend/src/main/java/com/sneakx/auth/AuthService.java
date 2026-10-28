
package com.sneakx.auth;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sneakx.security.JwtService;
import com.sneakx.user.Role;
import com.sneakx.user.RoleRepository;
import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public AuthService(
                        UserRepository userRepository,
                        RoleRepository roleRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService) {

                this.userRepository = userRepository;
                this.roleRepository = roleRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
        }

        public AuthResponse register(RegisterRequest request) {

                String email = request.getEmail().trim().toLowerCase();

                if (userRepository.existsByEmail(email)) {
                        throw new IllegalArgumentException(
                                        "An account with this email already exists");
                }

                Role customerRole = roleRepository.findByName("CUSTOMER")
                                .orElseThrow(() -> new IllegalStateException(
                                                "CUSTOMER role is not configured"));

                User user = new User();

                user.setFirstName(request.getFirstName().trim());
                user.setLastName(
                                request.getLastName() != null
                                                ? request.getLastName().trim()
                                                : null);
                user.setEmail(email);
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setPhone(
                                request.getPhone() != null
                                                ? request.getPhone().trim()
                                                : null);

                // Public registration always assigns CUSTOMER.
                user.addRole(customerRole);

                User savedUser = userRepository.save(user);

                return createAuthResponse(savedUser);
        }

        /**
         * Normal login for customers and administrators.
         * Existing roles are retained in the authentication response.
         */
        public AuthResponse login(LoginRequest request) {

                User user = authenticateCredentials(request);

                return createAuthResponse(user);
        }

        /**
         * Dedicated login for the confidential admin portal.
         * Only active users with the ADMIN role can receive a token.
         */
        public AuthResponse adminLogin(LoginRequest request) {

                User user = authenticateCredentials(request);

                boolean isAdmin = user.getRoles().stream()
                                .anyMatch(role -> "ADMIN".equals(role.getName()));

                if (!isAdmin) {
                        // Valid credentials, but this user is not an administrator.
                        throw new AccessDeniedException(
                                        "Unauthorized access. Administrator privileges required.");
                }

                return createAuthResponse(user);
        }

        /**
         * Validates credentials and rejects inactive accounts.
         */
        private User authenticateCredentials(LoginRequest request) {

                String email = request.getEmail().trim().toLowerCase();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new BadCredentialsException(
                                                "Invalid email or password"));

                if (!user.isActive()
                                || !passwordEncoder.matches(
                                                request.getPassword(),
                                                user.getPassword())) {

                        throw new BadCredentialsException(
                                        "Invalid email or password");
                }

                return user;
        }

        /**
         * Creates the authentication response with a JWT and existing roles.
         */
        private AuthResponse createAuthResponse(User user) {

                String token = jwtService.generateToken(user.getEmail());

                Set<String> roles = user.getRoles().stream()
                                .map(Role::getName)
                                .collect(Collectors.toSet());

                return new AuthResponse(
                                token,
                                user.getId(),
                                user.getFirstName(),
                                user.getLastName(),
                                user.getEmail(),
                                roles);
        }
}
