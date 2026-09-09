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

        public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http)
                        throws Exception {

                http
                                // JWT-based APIs do not use browser sessions or CSRF tokens.
                                .csrf(csrf -> csrf.disable())

                                // Disable Spring Security's default login page.
                                .formLogin(form -> form.disable())

                                // Disable HTTP Basic authentication.
                                .httpBasic(basic -> basic.disable())

                                // Every request must be authenticated unless explicitly
                                // marked as public below.
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                // Authentication and authorization rules.
                                .authorizeHttpRequests(auth -> auth

                                                // Public authentication endpoints.
                                                .requestMatchers(
                                                                "/api/auth/register",
                                                                "/api/auth/login")
                                                .permitAll()

                                                // Every other API requires authentication.
                                                .anyRequest().authenticated())

                                // Convert unauthenticated requests into HTTP 401.
                                .exceptionHandling(exception -> exception
                                                .authenticationEntryPoint(authenticationEntryPoint())
                                                .accessDeniedHandler(accessDeniedHandler()))

                                // JWT must run before Spring Security tries to authorize
                                // the request.
                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        /**
         * Handles requests where the user has not authenticated.
         *
         * Example:
         * GET /api/auth/me
         * without Authorization header
         *
         * Result:
         * HTTP 401 Unauthorized
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
         * Handles requests where the user is authenticated but
         * does not have the required role.
         *
         * Example:
         * CUSTOMER trying to access ADMIN endpoint
         *
         * Result:
         * HTTP 403 Forbidden
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