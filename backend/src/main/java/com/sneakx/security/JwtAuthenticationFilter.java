package com.sneakx.security;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

        private static final String BEARER_PREFIX = "Bearer ";

        private final JwtService jwtService;
        private final UserRepository userRepository;

        public JwtAuthenticationFilter(
                        JwtService jwtService,
                        UserRepository userRepository) {

                this.jwtService = jwtService;
                this.userRepository = userRepository;
        }

        @Override
        protected void doFilterInternal(
                        HttpServletRequest request,
                        HttpServletResponse response,
                        FilterChain filterChain)
                        throws ServletException, IOException {

                String authHeader = request.getHeader("Authorization");

                /*
                 * No Authorization header.
                 *
                 * Continue normally.
                 * Public endpoints can proceed, while protected
                 * endpoints will later be rejected by Spring Security.
                 */
                if (authHeader == null || authHeader.isBlank()) {
                        filterChain.doFilter(request, response);
                        return;
                }

                /*
                 * Ignore non-Bearer authorization schemes.
                 */
                if (!authHeader.startsWith(BEARER_PREFIX)) {
                        filterChain.doFilter(request, response);
                        return;
                }

                String token = authHeader
                                .substring(BEARER_PREFIX.length())
                                .trim();

                /*
                 * Empty Bearer token is invalid.
                 */
                if (token.isBlank()) {
                        filterChain.doFilter(request, response);
                        return;
                }

                try {

                        /*
                         * Do not replace an authentication that another
                         * security mechanism may already have established.
                         */
                        if (SecurityContextHolder.getContext()
                                        .getAuthentication() != null) {

                                filterChain.doFilter(request, response);
                                return;
                        }

                        /*
                         * Extract the email from the JWT subject.
                         */
                        String email = jwtService.extractEmail(token);

                        if (email == null || email.isBlank()) {
                                filterChain.doFilter(request, response);
                                return;
                        }

                        /*
                         * Load the current user from the database.
                         *
                         * This allows account deactivation and role changes
                         * to take effect without waiting for JWT expiration.
                         */
                        User user = userRepository.findByEmail(email)
                                        .orElse(null);

                        if (user == null || !user.isActive()) {
                                filterChain.doFilter(request, response);
                                return;
                        }

                        /*
                         * Verify JWT signature, subject and expiration.
                         */
                        if (!jwtService.isTokenValid(token, email)) {
                                filterChain.doFilter(request, response);
                                return;
                        }

                        /*
                         * Build authorities from the current database roles.
                         */
                        Set<SimpleGrantedAuthority> authorities = user.getRoles()
                                        .stream()
                                        .map(role -> new SimpleGrantedAuthority(
                                                        "ROLE_" + role.getName()))
                                        .collect(Collectors.toSet());

                        /*
                         * IMPORTANT:
                         *
                         * Use email as the authentication principal.
                         *
                         * This makes:
                         *
                         * authentication.getName()
                         *
                         * return the user's email.
                         *
                         * CartService and other services can therefore
                         * safely use authentication.getName() with
                         * UserRepository.findByEmail(...).
                         */
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                        email,
                                        null,
                                        authorities);

                        SecurityContextHolder
                                        .getContext()
                                        .setAuthentication(authentication);

                } catch (Exception exception) {

                        /*
                         * Never expose JWT parsing/signature details.
                         *
                         * Continue without authentication.
                         * Spring Security will handle protected endpoints.
                         */
                }

                filterChain.doFilter(request, response);
        }
}