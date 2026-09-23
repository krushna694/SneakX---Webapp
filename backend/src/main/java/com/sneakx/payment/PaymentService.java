package com.sneakx.payment;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sneakx.inventory.InventoryService;
import com.sneakx.order.Order;
import com.sneakx.order.OrderItem;
import com.sneakx.order.OrderRepository;
import com.sneakx.order.OrderStatus;
import com.sneakx.user.User;
import com.sneakx.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PaymentService {

        private final PaymentRepository paymentRepository;
        private final OrderRepository orderRepository;
        private final UserRepository userRepository;
        private final InventoryService inventoryService;
        private final RazorpayService razorpayService;
        private final RazorpaySignatureService razorpaySignatureService;

        @Value("${razorpay.key.id}")
        private String razorpayKeyId;

        public PaymentService(
                        PaymentRepository paymentRepository,
                        OrderRepository orderRepository,
                        UserRepository userRepository,
                        InventoryService inventoryService,
                        RazorpayService razorpayService,
                        RazorpaySignatureService razorpaySignatureService) {

                this.paymentRepository = paymentRepository;
                this.orderRepository = orderRepository;
                this.userRepository = userRepository;
                this.inventoryService = inventoryService;
                this.razorpayService = razorpayService;
                this.razorpaySignatureService = razorpaySignatureService;
        }

        // --------------------------------------------------
        // GET PAYMENT
        // --------------------------------------------------

        @Transactional(readOnly = true)
        public PaymentResponse getPayment(
                        Long orderId,
                        Authentication authentication) {

                User user = getAuthenticatedUser(authentication);

                Order order = orderRepository
                                .findByIdAndUserId(orderId, user.getId())
                                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

                Payment payment = paymentRepository
                                .findByOrderId(order.getId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Payment not found for order"));

                return toResponse(payment);
        }

        // --------------------------------------------------
        // CREATE PAYMENT
        // --------------------------------------------------

        @Transactional
        public PaymentResponse createPayment(
                        Long orderId,
                        PaymentMethod paymentMethod,
                        String idempotencyKey,
                        Authentication authentication) {

                User user = getAuthenticatedUser(authentication);

                // --------------------------------------------------
                // REQUEST VALIDATION
                // --------------------------------------------------

                if (idempotencyKey == null || idempotencyKey.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Idempotency key is required");
                }

                if (paymentMethod == null) {
                        throw new IllegalArgumentException(
                                        "Payment method is required");
                }

                String normalizedIdempotencyKey = idempotencyKey.trim();

                if (normalizedIdempotencyKey.length() > 100) {
                        throw new IllegalArgumentException(
                                        "Idempotency key is too long");
                }

                // --------------------------------------------------
                // LOAD ORDER
                // --------------------------------------------------

                Order order = orderRepository
                                .findByIdAndUserId(orderId, user.getId())
                                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

                // --------------------------------------------------
                // IDEMPOTENCY CHECK
                // --------------------------------------------------

                Payment existingPayment = paymentRepository
                                .findByIdempotencyKey(normalizedIdempotencyKey)
                                .orElse(null);

                if (existingPayment != null) {

                        /*
                         * Prevent an idempotency key belonging to
                         * another order from being reused.
                         */
                        if (!existingPayment.getOrder()
                                        .getId()
                                        .equals(order.getId())) {

                                throw new IllegalStateException(
                                                "Idempotency key already belongs to another order");
                        }

                        /*
                         * Prevent the same idempotency key from being
                         * reused with another payment method.
                         */
                        if (existingPayment.getPaymentMethod() != paymentMethod) {

                                throw new IllegalStateException(
                                                "Idempotency key cannot be reused with another payment method");
                        }

                        return toResponse(existingPayment);
                }

                // --------------------------------------------------
                // ONE PAYMENT PER ORDER
                // --------------------------------------------------

                if (paymentRepository.existsByOrderId(order.getId())) {
                        throw new IllegalStateException(
                                        "Payment already exists for this order");
                }

                // --------------------------------------------------
                // ORDER VALIDATION
                // --------------------------------------------------

                if (order.getStatus() != OrderStatus.PENDING) {
                        throw new IllegalStateException(
                                        "Payment cannot be created for this order. Current status: "
                                                        + order.getStatus());
                }

                if (order.getTotalAmount() == null) {
                        throw new IllegalStateException(
                                        "Order total amount is missing");
                }

                if (order.getTotalAmount().signum() < 0) {
                        throw new IllegalStateException(
                                        "Order total amount cannot be negative");
                }

                // --------------------------------------------------
                // CREATE LOCAL PAYMENT
                // --------------------------------------------------

                Payment payment = new Payment();

                payment.setOrder(order);
                payment.setPaymentMethod(paymentMethod);
                payment.setStatus(PaymentStatus.PENDING);
                payment.setAmount(order.getTotalAmount());
                payment.setCurrency("INR");
                payment.setIdempotencyKey(normalizedIdempotencyKey);

                // --------------------------------------------------
                // RAZORPAY
                // --------------------------------------------------

                if (paymentMethod == PaymentMethod.RAZORPAY) {

                        payment.setProvider("RAZORPAY");

                        /*
                         * Razorpay amount comes from our trusted
                         * server-side Order entity.
                         *
                         * React must never decide the payment amount.
                         */
                        RazorpayOrderResponse razorpayOrder = razorpayService.createOrder(
                                        order,
                                        razorpayKeyId);

                        payment.setProviderOrderId(
                                        razorpayOrder.razorpayOrderId());
                }

                // --------------------------------------------------
                // CASH ON DELIVERY
                // --------------------------------------------------

                else if (paymentMethod == PaymentMethod.COD) {

                        payment.setProvider("COD");

                        /*
                         * COD confirmation will be handled by the
                         * dedicated COD order-confirmation flow.
                         */
                }

                // --------------------------------------------------
                // SAVE PAYMENT
                // --------------------------------------------------

                Payment savedPayment = paymentRepository.save(payment);

                return toResponse(savedPayment);
        }

        // --------------------------------------------------
        // VERIFY RAZORPAY PAYMENT
        // --------------------------------------------------

        @Transactional
        public PaymentResponse verifyRazorpayPayment(
                        Long orderId,
                        PaymentVerificationRequest request,
                        Authentication authentication) {

                User user = getAuthenticatedUser(authentication);

                // --------------------------------------------------
                // REQUEST VALIDATION
                // --------------------------------------------------

                if (request == null) {
                        throw new IllegalArgumentException(
                                        "Payment verification request is required");
                }

                if (request.razorpayPaymentId() == null
                                || request.razorpayPaymentId().isBlank()) {

                        throw new IllegalArgumentException(
                                        "Razorpay payment ID is required");
                }

                if (request.razorpayOrderId() == null
                                || request.razorpayOrderId().isBlank()) {

                        throw new IllegalArgumentException(
                                        "Razorpay order ID is required");
                }

                if (request.razorpaySignature() == null
                                || request.razorpaySignature().isBlank()) {

                        throw new IllegalArgumentException(
                                        "Razorpay payment signature is required");
                }

                // --------------------------------------------------
                // LOAD USER'S ORDER
                // --------------------------------------------------

                Order order = orderRepository
                                .findByIdAndUserId(orderId, user.getId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Order not found"));

                // --------------------------------------------------
                // LOAD PAYMENT
                // --------------------------------------------------

                Payment existingPayment = paymentRepository
                                .findByOrderId(order.getId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Payment not found for order"));

                /*
                 * Reload the payment using a pessimistic database lock.
                 *
                 * This prevents frontend verification and Razorpay
                 * webhook processing from confirming the same payment
                 * simultaneously.
                 */
                Payment payment = paymentRepository
                                .findByIdForUpdate(existingPayment.getId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Payment not found for order"));

                // --------------------------------------------------
                // PAYMENT METHOD VALIDATION
                // --------------------------------------------------

                if (payment.getPaymentMethod() != PaymentMethod.RAZORPAY) {

                        throw new IllegalStateException(
                                        "This order is not a Razorpay payment");
                }

                // --------------------------------------------------
                // IDEMPOTENT SUCCESS
                // --------------------------------------------------

                if (payment.getStatus() == PaymentStatus.SUCCESS) {

                        return toResponse(payment);
                }

                // --------------------------------------------------
                // PAYMENT STATUS VALIDATION
                // --------------------------------------------------

                if (payment.getStatus() != PaymentStatus.PENDING) {

                        throw new IllegalStateException(
                                        "Payment cannot be verified from status: "
                                                        + payment.getStatus());
                }

                // --------------------------------------------------
                // RAZORPAY ORDER ID VALIDATION
                // --------------------------------------------------

                if (payment.getProviderOrderId() == null
                                || !payment.getProviderOrderId()
                                                .equals(request.razorpayOrderId())) {

                        throw new IllegalArgumentException(
                                        "Razorpay order ID does not match");
                }

                // --------------------------------------------------
                // SIGNATURE VERIFICATION
                // --------------------------------------------------

                boolean signatureValid = razorpaySignatureService
                                .verifyPaymentSignature(
                                                request.razorpayOrderId(),
                                                request.razorpayPaymentId(),
                                                request.razorpaySignature());

                if (!signatureValid) {

                        throw new IllegalArgumentException(
                                        "Invalid Razorpay payment signature");
                }

                // --------------------------------------------------
                // MARK PAYMENT SUCCESSFUL
                // --------------------------------------------------

                return markPaymentSuccessfulInternal(
                                payment,
                                request.razorpayPaymentId(),
                                request.razorpaySignature());
        }

        // --------------------------------------------------
        // INTERNAL PAYMENT SUCCESS
        // --------------------------------------------------

        @Transactional
        public PaymentResponse markPaymentSuccessful(
                        Long paymentId,
                        String providerPaymentId,
                        String providerSignature) {

                Payment payment = paymentRepository
                                .findByIdForUpdate(paymentId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Payment not found"));

                return markPaymentSuccessfulInternal(
                                payment,
                                providerPaymentId,
                                providerSignature);
        }

        // --------------------------------------------------
        // PAYMENT SUCCESS PROCESSOR
        // --------------------------------------------------

        private PaymentResponse markPaymentSuccessfulInternal(
                        Payment payment,
                        String providerPaymentId,
                        String providerSignature) {

                // --------------------------------------------------
                // IDEMPOTENT SUCCESS
                // --------------------------------------------------

                if (payment.getStatus() == PaymentStatus.SUCCESS) {

                        return toResponse(payment);
                }

                // --------------------------------------------------
                // STATUS VALIDATION
                // --------------------------------------------------

                if (payment.getStatus() != PaymentStatus.PENDING) {

                        throw new IllegalStateException(
                                        "Payment cannot be marked successful from status: "
                                                        + payment.getStatus());
                }

                // --------------------------------------------------
                // PROVIDER VALIDATION
                // --------------------------------------------------

                if (providerPaymentId == null
                                || providerPaymentId.isBlank()) {

                        throw new IllegalArgumentException(
                                        "Provider payment ID is required");
                }

                // --------------------------------------------------
                // LOAD ORDER
                // --------------------------------------------------

                Order order = payment.getOrder();

                if (order == null) {
                        throw new IllegalStateException(
                                        "Payment is not associated with an order");
                }

                // --------------------------------------------------
                // VERIFY ORDER STATE
                // --------------------------------------------------

                if (order.getStatus() != OrderStatus.PENDING) {

                        /*
                         * A payment should only transition an order
                         * from PENDING to CONFIRMED.
                         */
                        throw new IllegalStateException(
                                        "Order cannot be confirmed from status: "
                                                        + order.getStatus());
                }

                // --------------------------------------------------
                // STORE PROVIDER INFORMATION
                // --------------------------------------------------

                payment.setProviderPaymentId(
                                providerPaymentId);

                payment.setProviderSignature(
                                providerSignature);

                payment.setStatus(
                                PaymentStatus.SUCCESS);

                payment.setPaidAt(
                                LocalDateTime.now());

                payment.setFailureReason(null);

                // --------------------------------------------------
                // CONFIRM RESERVED INVENTORY
                // --------------------------------------------------

                /*
                 * Inventory was reserved when the order was created.
                 *
                 * Successful payment converts:
                 *
                 * reserved stock
                 * ↓
                 * confirmed/consumed stock
                 */
                confirmReservedInventory(order);

                // --------------------------------------------------
                // CONFIRM ORDER
                // --------------------------------------------------

                order.setPaymentStatus(
                                PaymentStatus.SUCCESS);

                order.setStatus(
                                OrderStatus.CONFIRMED);

                // --------------------------------------------------
                // SAVE
                // --------------------------------------------------

                paymentRepository.save(payment);
                orderRepository.save(order);

                return toResponse(payment);
        }

        // --------------------------------------------------
        // INTERNAL PAYMENT FAILURE
        // --------------------------------------------------

        @Transactional
        public PaymentResponse markPaymentFailed(
                        Long paymentId,
                        String failureReason) {

                Payment payment = paymentRepository
                                .findByIdForUpdate(paymentId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Payment not found"));

                // --------------------------------------------------
                // IDEMPOTENT FAILURE
                // --------------------------------------------------

                if (payment.getStatus() == PaymentStatus.FAILED) {

                        return toResponse(payment);
                }

                // --------------------------------------------------
                // SUCCESS PROTECTION
                // --------------------------------------------------

                if (payment.getStatus() == PaymentStatus.SUCCESS) {

                        throw new IllegalStateException(
                                        "Successful payment cannot be marked as failed");
                }

                // --------------------------------------------------
                // STATUS VALIDATION
                // --------------------------------------------------

                if (payment.getStatus() != PaymentStatus.PENDING
                                && payment.getStatus() != PaymentStatus.PROCESSING) {

                        throw new IllegalStateException(
                                        "Payment cannot be marked failed from status: "
                                                        + payment.getStatus());
                }

                // --------------------------------------------------
                // LOAD ORDER
                // --------------------------------------------------

                Order order = payment.getOrder();

                if (order == null) {
                        throw new IllegalStateException(
                                        "Payment is not associated with an order");
                }

                // --------------------------------------------------
                // RELEASE RESERVED INVENTORY
                // --------------------------------------------------

                /*
                 * Payment failed.
                 *
                 * Release the stock reservation so that
                 * another customer can purchase the product.
                 */
                releaseReservedInventory(order);

                // --------------------------------------------------
                // UPDATE PAYMENT
                // --------------------------------------------------

                payment.setStatus(
                                PaymentStatus.FAILED);

                payment.setFailureReason(
                                normalizeFailureReason(failureReason));

                // --------------------------------------------------
                // UPDATE ORDER
                // --------------------------------------------------

                order.setPaymentStatus(
                                PaymentStatus.FAILED);

                /*
                 * IMPORTANT:
                 *
                 * Do not cancel the order here.
                 *
                 * Keeping it PENDING allows the customer to retry
                 * payment for the same order.
                 */
                order.setStatus(
                                OrderStatus.PENDING);

                // --------------------------------------------------
                // SAVE
                // --------------------------------------------------

                paymentRepository.save(payment);
                orderRepository.save(order);

                return toResponse(payment);
        }

        // --------------------------------------------------
        // CONFIRM RESERVED INVENTORY
        // --------------------------------------------------

        private void confirmReservedInventory(
                        Order order) {

                List<OrderItem> items = order.getItems();

                if (items == null || items.isEmpty()) {

                        throw new IllegalStateException(
                                        "Order contains no items");
                }

                for (OrderItem item : items) {

                        if (item.getVariant() == null) {

                                throw new IllegalStateException(
                                                "Order item has no product variant");
                        }

                        if (item.getQuantity() <= 0) {

                                throw new IllegalStateException(
                                                "Order item quantity must be greater than zero");
                        }

                        inventoryService.confirmReservedStock(
                                        item.getVariant().getId(),
                                        item.getQuantity());
                }
        }

        // --------------------------------------------------
        // RELEASE RESERVED INVENTORY
        // --------------------------------------------------

        private void releaseReservedInventory(
                        Order order) {

                List<OrderItem> items = order.getItems();

                if (items == null || items.isEmpty()) {
                        return;
                }

                for (OrderItem item : items) {

                        if (item.getVariant() == null) {

                                throw new IllegalStateException(
                                                "Order item has no product variant");
                        }

                        if (item.getQuantity() <= 0) {

                                throw new IllegalStateException(
                                                "Order item quantity must be greater than zero");
                        }

                        inventoryService.releaseStock(
                                        item.getVariant().getId(),
                                        item.getQuantity());
                }
        }

        // --------------------------------------------------
        // FAILURE REASON NORMALIZATION
        // --------------------------------------------------

        private String normalizeFailureReason(
                        String failureReason) {

                if (failureReason == null
                                || failureReason.isBlank()) {

                        return "Payment failed";
                }

                String normalized = failureReason.trim();

                if (normalized.length() > 500) {
                        return normalized.substring(0, 500);
                }

                return normalized;
        }
        // --------------------------------------------------
        // FIND PAYMENT BY RAZORPAY ORDER ID
        // --------------------------------------------------

        @Transactional(readOnly = true)
        public Payment findPaymentByProviderOrderId(
                        String providerOrderId) {

                if (providerOrderId == null
                                || providerOrderId.isBlank()) {

                        throw new IllegalArgumentException(
                                        "Razorpay order ID is required");
                }

                return paymentRepository
                                .findByProviderOrderId(
                                                providerOrderId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Payment not found for Razorpay order: "
                                                                + providerOrderId));
        }
        // --------------------------------------------------
        // AUTHENTICATED USER
        // --------------------------------------------------

        private User getAuthenticatedUser(
                        Authentication authentication) {

                if (authentication == null
                                || !authentication.isAuthenticated()) {

                        throw new IllegalStateException(
                                        "Authentication is required");
                }

                String email = authentication.getName();

                if (email == null || email.isBlank()) {

                        throw new IllegalStateException(
                                        "Authenticated user email is missing");
                }

                return userRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "User not found"));
        }

        // --------------------------------------------------
        // RESPONSE MAPPER
        // --------------------------------------------------

        private PaymentResponse toResponse(
                        Payment payment) {

                Order order = payment.getOrder();

                /*
                 * Razorpay Key ID is safe to send to the frontend.
                 *
                 * Razorpay Key Secret is NEVER returned.
                 */
                String checkoutKeyId = payment.getPaymentMethod() == PaymentMethod.RAZORPAY
                                ? razorpayKeyId
                                : null;

                return new PaymentResponse(
                                payment.getId(),
                                order.getId(),
                                order.getOrderNumber(),
                                payment.getPaymentMethod(),
                                payment.getStatus(),
                                payment.getAmount(),
                                payment.getCurrency(),
                                payment.getProvider(),
                                payment.getProviderOrderId(),
                                payment.getProviderPaymentId(),
                                checkoutKeyId,
                                payment.getFailureReason(),
                                payment.getPaidAt(),
                                payment.getCreatedAt(),
                                payment.getUpdatedAt());
        }
}