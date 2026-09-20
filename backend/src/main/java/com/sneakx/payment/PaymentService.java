package com.sneakx.payment;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sneakx.inventory.InventoryService;
import com.sneakx.order.Order;
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
                .findByIdempotencyKey(idempotencyKey)
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

        // --------------------------------------------------
        // CREATE LOCAL PAYMENT
        // --------------------------------------------------

        Payment payment = new Payment();

        payment.setOrder(order);
        payment.setPaymentMethod(paymentMethod);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setAmount(order.getTotalAmount());
        payment.setCurrency("INR");
        payment.setIdempotencyKey(idempotencyKey);

        // --------------------------------------------------
        // RAZORPAY
        // --------------------------------------------------

        if (paymentMethod == PaymentMethod.RAZORPAY) {

            payment.setProvider("RAZORPAY");

            /*
             * The Razorpay amount comes from our trusted
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
             * COD confirmation and inventory handling
             * will be implemented separately.
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
        // LOAD USER'S ORDER
        // --------------------------------------------------

        Order order = orderRepository
                .findByIdAndUserId(orderId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Order not found"));

        // --------------------------------------------------
        // LOAD PAYMENT
        // --------------------------------------------------

        Payment payment = paymentRepository
                .findByOrderId(order.getId())
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

        return markPaymentSuccessful(
                payment.getId(),
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
                .findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Payment not found"));

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

        // --------------------------------------------------
        // CONFIRM ORDER
        // --------------------------------------------------

        Order order = payment.getOrder();

        order.setStatus(
                OrderStatus.CONFIRMED);

        /*
         * Inventory confirmation will be connected
         * to the trusted payment confirmation flow.
         *
         * We intentionally do not confirm inventory here
         * until the complete payment/inventory workflow
         * is implemented.
         */

        return toResponse(
                paymentRepository.save(payment));
    }

    // --------------------------------------------------
    // INTERNAL PAYMENT FAILURE
    // --------------------------------------------------

    @Transactional
    public PaymentResponse markPaymentFailed(
            Long paymentId,
            String failureReason) {

        Payment payment = paymentRepository
                .findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Payment not found"));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {

            throw new IllegalStateException(
                    "Successful payment cannot be marked as failed");
        }

        payment.setStatus(
                PaymentStatus.FAILED);

        payment.setFailureReason(
                failureReason);

        /*
         * Reserved inventory release will be connected
         * to the final payment failure/expiration flow.
         */

        return toResponse(
                paymentRepository.save(payment));
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