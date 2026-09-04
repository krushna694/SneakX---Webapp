import { useEffect, useState } from "react";
import OrderContext from "./OrderContext";

function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("sneakx_orders");

        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "sneakx_orders",
            JSON.stringify(orders)
        );
    }, [orders]);

    const createOrder = ({
        items,
        address,
        paymentMethod,
        subtotal,
        shipping,
        total,
    }) => {
        const newOrder = {
            id: `SNX-${Date.now()}`,
            items,
            address,
            paymentMethod,
            subtotal,
            shipping,
            total,
            status: "PLACED",
            createdAt: new Date().toISOString(),
        };

        setOrders((currentOrders) => [
            newOrder,
            ...currentOrders,
        ]);

        return newOrder;
    };

    const getOrderById = (id) => {
        return orders.find(
            (order) => String(order.id) === String(id)
        );
    };

    const updateOrderStatus = (id, status) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === id
                    ? {
                        ...order,
                        status,
                    }
                    : order
            )
        );
    };

    const cancelOrder = (id) => {
        let cancelled = false;

        setOrders((currentOrders) =>
            currentOrders.map((order) => {
                const isCancellable =
                    order.status === "PLACED" ||
                    order.status === "CONFIRMED" ||
                    order.status === "PROCESSING";

                if (
                    String(order.id) === String(id) &&
                    isCancellable
                ) {
                    cancelled = true;

                    return {
                        ...order,
                        status: "CANCELLED",
                        cancelledAt: new Date().toISOString(),
                    };
                }

                return order;
            })
        );

        return cancelled;
    };

    const clearOrders = () => {
        setOrders([]);
    };

    const value = {
        orders,
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