import { useCallback, useEffect, useState } from "react";
import OrderContext from "./OrderContext";
import {
    getOrdersApi,
    getOrderByIdApi,
    createOrderApi,
    cancelOrderApi,
} from "../../../api/orderApi";

function normalizeOrder(order) {
    if (!order) {
        return null;
    }

    return {
        ...order,

        // Backend amounts → existing frontend naming
        subtotal: Number(order.subtotal ?? 0),
        discountAmount: Number(order.discountAmount ?? 0),
        shipping: Number(order.shippingAmount ?? 0),
        shippingAmount: Number(order.shippingAmount ?? 0),
        taxAmount: Number(order.taxAmount ?? 0),
        total: Number(order.totalAmount ?? 0),
        totalAmount: Number(order.totalAmount ?? 0),

        // Keep payment status separate from payment method.
        paymentStatus: order.paymentStatus ?? "PENDING",
        paymentMethod: order.paymentMethod ?? null,

        // The backend currently provides addressId,
        // not necessarily a complete address object.
        addressId: order.addressId ?? null,
        address: order.address ?? null,

        // Normalize backend order items for the existing UI.
        items: Array.isArray(order.items)
            ? order.items.map((item) => ({
                ...item,
                product: {
                    id: item.productId,
                    name: item.productName,
                    price: Number(item.unitPrice ?? 0),
                },
                variantId: item.variantId,
                size: item.size,
                quantity: Number(item.quantity ?? 0),
                unitPrice: Number(item.unitPrice ?? 0),
                totalPrice: Number(item.totalPrice ?? 0),
            }))
            : [],
    };
}

function extractResponseData(response) {
    if (response?.data !== undefined) {
        return response.data;
    }

    return response;
}

function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => Boolean(localStorage.getItem("sneakx_token"))
    );

    const loadOrders = useCallback(async () => {
        const token = localStorage.getItem("sneakx_token");

        if (!token) {
            setIsAuthenticated(false);
            setOrders([]);
            setError(null);
            setLoading(false);
            return;
        }

        setIsAuthenticated(true);
        setLoading(true);
        setError(null);

        try {
            const response = await getOrdersApi();
            const data = extractResponseData(response);

            const normalizedOrders = Array.isArray(data)
                ? data.map(normalizeOrder).filter(Boolean)
                : [];

            setOrders(normalizedOrders);
        } catch (err) {
            console.error("Failed to load orders:", err);

            setOrders([]);
            setError(
                err?.response?.data?.message ||
                "Failed to load your orders. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleAuthChange = () => {
            const token = localStorage.getItem("sneakx_token");

            setIsAuthenticated(Boolean(token));

            if (token) {
                loadOrders();
            } else {
                setOrders([]);
                setError(null);
                setLoading(false);
            }
        };

        const handleStorageChange = (event) => {
            if (event.key === "sneakx_token") {
                handleAuthChange();
            }
        };

        handleAuthChange();

        window.addEventListener(
            "sneakx_auth_changed",
            handleAuthChange
        );

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () => {
            window.removeEventListener(
                "sneakx_auth_changed",
                handleAuthChange
            );

            window.removeEventListener(
                "storage",
                handleStorageChange
            );
        };
    }, [loadOrders]);

    const createOrder = useCallback(async (orderData) => {
        setError(null);

        try {
            const response = await createOrderApi(orderData);
            const data = extractResponseData(response);
            const newOrder = normalizeOrder(data);

            if (newOrder) {
                setOrders((currentOrders) => [
                    newOrder,
                    ...currentOrders.filter(
                        (order) =>
                            String(order.id) !== String(newOrder.id)
                    ),
                ]);
            }

            return newOrder;
        } catch (err) {
            console.error("Failed to create order:", err);

            const message =
                err?.response?.data?.message ||
                "Failed to create order. Please try again.";

            setError(message);
            throw err;
        }
    }, []);

    const getOrderById = useCallback(async (id) => {
        if (!id) {
            return null;
        }

        const token = localStorage.getItem("sneakx_token");

        if (!token) {
            return null;
        }

        try {
            // Fetch the backend's latest order details.
            const response = await getOrderByIdApi(id);
            const data = extractResponseData(response);
            const normalizedOrder = normalizeOrder(data);

            if (normalizedOrder) {
                setOrders((currentOrders) => {
                    const exists = currentOrders.some(
                        (order) =>
                            String(order.id) ===
                            String(normalizedOrder.id)
                    );

                    if (exists) {
                        return currentOrders.map((order) =>
                            String(order.id) ===
                                String(normalizedOrder.id)
                                ? normalizedOrder
                                : order
                        );
                    }

                    return [normalizedOrder, ...currentOrders];
                });
            }

            return normalizedOrder;
        } catch (err) {
            console.error(`Failed to load order ${id}:`, err);

            setError(
                err?.response?.data?.message ||
                "Failed to load the order."
            );

            return null;
        }
    }, []);

    // Retained for compatibility with existing consumers.
    // This updates frontend state only; it does not update the backend.
    const updateOrderStatus = useCallback((id, status) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                String(order.id) === String(id)
                    ? { ...order, status }
                    : order
            )
        );
    }, []);

    // Cancellation is not supported by the current backend API.
    // Do not pretend an order was cancelled successfully.
    const cancelOrder = useCallback(async (id) => {
        if (!id) {
            setError("A valid order ID is required.");
            return false;
        }

        setError(null);

        try {
            const response = await cancelOrderApi(id);
            const data = extractResponseData(response);
            const cancelledOrder = normalizeOrder(data);

            if (!cancelledOrder) {
                throw new Error("The server returned an invalid order response.");
            }

            // Synchronize the UI with the order returned by the backend.
            setOrders((currentOrders) => {
                const exists = currentOrders.some(
                    (order) => String(order.id) === String(cancelledOrder.id)
                );

                if (exists) {
                    return currentOrders.map((order) =>
                        String(order.id) === String(cancelledOrder.id)
                            ? cancelledOrder
                            : order
                    );
                }

                return [cancelledOrder, ...currentOrders];
            });

            return true;
        } catch (err) {
            console.error("Failed to cancel order:", err);

            setError(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Failed to cancel the order. Please try again."
            );

            return false;
        }
    }, []);

    const clearOrders = useCallback(() => {
        setOrders([]);
        setError(null);
    }, []);

    const value = {
        orders,
        loading,
        error,
        isAuthenticated,
        loadOrders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        cancelOrder,
        clearOrders,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;
