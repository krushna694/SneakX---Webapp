package com.sneakx.order;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sneakx.address.Address;
import com.sneakx.address.AddressRepository;
import com.sneakx.cart.Cart;
import com.sneakx.cart.CartItem;
import com.sneakx.cart.CartRepository;
import com.sneakx.payment.PaymentStatus;
import com.sneakx.product.Product;
import com.sneakx.product.ProductVariant;
import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            AddressRepository addressRepository,
            CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.cartRepository = cartRepository;
    }

    @Transactional
    public OrderResponse createOrder(
            OrderRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository
                .findByIdAndUserId(request.getAddressId(), user.getId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Cart cart = cartRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot create order from empty cart");
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal discountAmount = BigDecimal.ZERO;

        Order order = new Order();

        order.setUser(user);
        order.setAddress(address);
        order.setOrderNumber(generateOrderNumber());

        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);

        for (CartItem cartItem : cart.getItems()) {

            ProductVariant variant = cartItem.getVariant();

            if (variant == null) {
                throw new RuntimeException(
                        "Product variant not found");
            }

            Product product = variant.getProduct();

            if (product == null) {
                throw new RuntimeException(
                        "Product not found");
            }

            if (!product.isActive()) {
                throw new RuntimeException(
                        "Product is no longer available: "
                                + product.getName());
            }

            if (!variant.isActive()) {
                throw new RuntimeException(
                        "Product variant is no longer available");
            }

            if (variant.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for "
                                + product.getName());
            }

            BigDecimal basePrice = variant.getPriceOverride() != null
                    ? variant.getPriceOverride()
                    : product.getPrice();

            BigDecimal discountPercentage = product.getDiscountPercentage() != null
                    ? product.getDiscountPercentage()
                    : BigDecimal.ZERO;

            BigDecimal itemDiscount = basePrice
                    .multiply(discountPercentage)
                    .divide(
                            BigDecimal.valueOf(100),
                            2,
                            RoundingMode.HALF_UP);

            BigDecimal finalUnitPrice = basePrice.subtract(itemDiscount);

            BigDecimal itemTotal = finalUnitPrice.multiply(
                    BigDecimal.valueOf(cartItem.getQuantity()));

            BigDecimal originalTotal = basePrice.multiply(
                    BigDecimal.valueOf(cartItem.getQuantity()));

            BigDecimal totalDiscount = originalTotal.subtract(itemTotal);

            subtotal = subtotal.add(originalTotal);
            discountAmount = discountAmount.add(totalDiscount);

            OrderItem orderItem = new OrderItem();

            orderItem.setProduct(product);
            orderItem.setVariant(variant);

            orderItem.setProductName(product.getName());
            orderItem.setSku(variant.getSku());
            orderItem.setSize(variant.getSize());

            orderItem.setUnitPrice(finalUnitPrice);
            orderItem.setDiscountAmount(totalDiscount);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(itemTotal);

            order.addItem(orderItem);
        }

        BigDecimal shippingAmount = calculateShipping(subtotal);
        BigDecimal taxAmount = BigDecimal.ZERO;

        BigDecimal totalAmount = subtotal
                .subtract(discountAmount)
                .add(shippingAmount)
                .add(taxAmount);

        order.setSubtotal(subtotal);
        order.setDiscountAmount(discountAmount);
        order.setShippingAmount(shippingAmount);
        order.setTaxAmount(taxAmount);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();

        return mapToResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getMyOrder(
            Long orderId,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository
                .findByIdAndUserId(orderId, user.getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToResponse(order);
    }

    private BigDecimal calculateShipping(BigDecimal subtotal) {

        // Free shipping for orders >= ₹2000
        if (subtotal.compareTo(BigDecimal.valueOf(2000)) >= 0) {
            return BigDecimal.ZERO;
        }

        return BigDecimal.valueOf(100);
    }

    private String generateOrderNumber() {

        String timestamp = LocalDateTime.now()
                .format(
                        DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        String randomPart = UUID.randomUUID()
                .toString()
                .substring(0, 6)
                .toUpperCase();

        return "SNX-" + timestamp + "-" + randomPart;
    }

    private OrderResponse mapToResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setId(order.getId());
        response.setOrderNumber(order.getOrderNumber());

        response.setStatus(order.getStatus());
        response.setPaymentStatus(order.getPaymentStatus());

        response.setAddressId(
                order.getAddress().getId());

        response.setSubtotal(order.getSubtotal());
        response.setDiscountAmount(order.getDiscountAmount());
        response.setShippingAmount(order.getShippingAmount());
        response.setTaxAmount(order.getTaxAmount());
        response.setTotalAmount(order.getTotalAmount());

        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());

        List<OrderResponse.OrderItemResponse> items = order.getItems()
                .stream()
                .map(item -> {

                    OrderResponse.OrderItemResponse itemResponse = new OrderResponse.OrderItemResponse();

                    itemResponse.setId(item.getId());

                    itemResponse.setProductId(
                            item.getProduct().getId());

                    itemResponse.setVariantId(
                            item.getVariant().getId());

                    itemResponse.setProductName(
                            item.getProductName());

                    itemResponse.setSku(
                            item.getSku());

                    itemResponse.setSize(
                            item.getSize());

                    itemResponse.setUnitPrice(
                            item.getUnitPrice());

                    itemResponse.setDiscountAmount(
                            item.getDiscountAmount());

                    itemResponse.setQuantity(
                            item.getQuantity());

                    itemResponse.setTotalPrice(
                            item.getTotalPrice());

                    return itemResponse;
                })
                .toList();

        response.setItems(items);

        return response;
    }
}