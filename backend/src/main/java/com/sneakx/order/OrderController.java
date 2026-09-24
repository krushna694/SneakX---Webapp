package com.sneakx.order;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneakx.common.response.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

        private final OrderService orderService;

        public OrderController(OrderService orderService) {
                this.orderService = orderService;
        }

        @PostMapping
        public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
                        @Valid @RequestBody OrderRequest request,
                        Authentication authentication) {

                OrderResponse order = orderService.createOrder(
                                request,
                                authentication);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(
                                                ApiResponse.success(
                                                                "Order created successfully",
                                                                order));
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(
                        Authentication authentication) {

                List<OrderResponse> orders = orderService.getMyOrders(authentication);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Orders fetched successfully",
                                                orders));
        }

        @GetMapping("/{orderId}")
        public ResponseEntity<ApiResponse<OrderResponse>> getMyOrder(
                        @PathVariable Long orderId,
                        Authentication authentication) {

                OrderResponse order = orderService.getMyOrder(
                                orderId,
                                authentication);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Order fetched successfully",
                                                order));
        }
}