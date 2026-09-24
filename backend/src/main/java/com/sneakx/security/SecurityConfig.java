package com.sneakx.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final RestAuthenticationEntryPoint authenticationEntryPoint;
        private final RestAccessDeniedHandler accessDeniedHandler;

        public SecurityConfig(
                        JwtAuthenticationFilter jwtAuthenticationFilter,
                        RestAuthenticationEntryPoint authenticationEntryPoint,
                        RestAccessDeniedHandler accessDeniedHandler) {

                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
                this.authenticationEntryPoint = authenticationEntryPoint;
                this.accessDeniedHandler = accessDeniedHandler;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http
                                // JWT APIs are stateless and do not use CSRF tokens.
                                .csrf(csrf -> csrf.disable())

                                // Enable application-level CORS configuration.
                                .cors(cors -> {
                                })

                                // Security response headers.
                                .headers(headers -> headers

                                                // Prevent MIME-type sniffing.
                                                .contentTypeOptions(contentTypeOptions -> {
                                                })

                                                // Prevent clickjacking/frame embedding.
                                                .frameOptions(frameOptions -> frameOptions.deny())

                                                // Restrict referrer information.
                                                .referrerPolicy(referrerPolicy -> referrerPolicy.policy(
                                                                org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))

                                                // Force HTTPS in production.
                                                .httpStrictTransportSecurity(hsts -> hsts
                                                                .includeSubDomains(true)
                                                                .preload(false)
                                                                .maxAgeInSeconds(31536000)))

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
                                                                "/api/auth/forgot-password",
                                                                "/api/auth/verify-reset-otp",
                                                                "/api/auth/reset-password",
                                                                "/api/payments/webhook")
                                                .permitAll()

                                                // Every other API requires authentication.
                                                .anyRequest()
                                                .authenticated())

                                // Authentication / authorization errors.
                                .exceptionHandling(exception -> exception

                                                .authenticationEntryPoint(
                                                                authenticationEntryPoint)

                                                .accessDeniedHandler(
                                                                accessDeniedHandler))

                                // JWT filter.
                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}