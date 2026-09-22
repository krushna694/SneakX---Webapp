package com.sneakx.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        public SecurityConfig(
                        JwtAuthenticationFilter jwtAuthenticationFilter) {

                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http
                                // JWT-based APIs do not use browser sessions or CSRF tokens.
                                .csrf(csrf -> csrf.disable())

                                // Disable Spring Security's default login page.
                                .formLogin(form -> form.disable())

                                // Disable HTTP Basic authentication.
                                .httpBasic(basic -> basic.disable())

                                // Stateless API.
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                // Authentication and authorization rules.
                                .authorizeHttpRequests(auth -> auth

                                                // Public authentication endpoints
                                                // and Razorpay webhook.
                                                .requestMatchers(
                                                                "/api/auth/register",
                                                                "/api/auth/login",
                                                                "/api/payments/webhook")
                                                .permitAll()

                                                // Every other API requires authentication.
                                                .anyRequest()
                                                .authenticated())

                                // Authentication / authorization errors.
                                .exceptionHandling(exception -> exception

                                                .authenticationEntryPoint(
                                                                authenticationEntryPoint())

                                                .accessDeniedHandler(
                                                                accessDeniedHandler()))

                                // JWT filter.
                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        /**
         * Handles unauthenticated requests.
         */
        @Bean
        public AuthenticationEntryPoint authenticationEntryPoint() {

                return (request, response, authenticationException) -> {

                        response.sendError(
                                        401,
                                        "Authentication required");
                };
        }

        /**
         * Handles authenticated users who do not
         * have the required role.
         */
        @Bean
        public AccessDeniedHandler accessDeniedHandler() {

                return (request, response, accessDeniedException) -> {

                        response.sendError(
                                        403,
                                        "Access denied");
                };
        }
}