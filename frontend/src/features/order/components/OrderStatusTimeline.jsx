import { motion } from "framer-motion";
import {
    CheckCircle,
    Circle,
    PackageCheck,
    Cog,
    Truck,
    MapPin,
    Home,
} from "lucide-react";

const statusSteps = [
    {
        key: "PLACED",
        label: "Order Placed",
        description: "Your order has been placed successfully.",
        icon: CheckCircle,
    },
    {
        key: "CONFIRMED",
        label: "Order Confirmed",
        description: "Your order has been confirmed.",
        icon: PackageCheck,
    },
    {
        key: "PROCESSING",
        label: "Processing",
        description: "Your order is being prepared.",
        icon: Cog,
    },
    {
        key: "SHIPPED",
        label: "Shipped",
        description: "Your order is on its way.",
        icon: Truck,
    },
    {
        key: "OUT_FOR_DELIVERY",
        label: "Out for Delivery",
        description: "Your order is out for delivery.",
        icon: MapPin,
    },
    {
        key: "DELIVERED",
        label: "Delivered",
        description: "Your order has been delivered.",
        icon: Home,
    },
];

function OrderStatusTimeline({ currentStatus }) {
    const currentIndex = statusSteps.findIndex(
        (step) => step.key === currentStatus
    );

    return (
        <motion.div
            className="card border-0 shadow-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-4">
                    <Truck size={21} />

                    <h5 className="fw-semibold mb-0">
                        Order Tracking
                    </h5>
                </div>

                <div>
                    {statusSteps.map((step, index) => {
                        const Icon = step.icon;

                        const isCompleted =
                            index <= currentIndex;

                        const isCurrent =
                            index === currentIndex;

                        const isLast =
                            index === statusSteps.length - 1;

                        return (
                            <div
                                key={step.key}
                                className="d-flex position-relative"
                            >

                                {/* Timeline line */}
                                {!isLast && (
                                    <div
                                        className="position-absolute"
                                        style={{
                                            left: "17px",
                                            top: "38px",
                                            width: "2px",
                                            height: "calc(100% - 4px)",
                                            backgroundColor:
                                                index < currentIndex
                                                    ? "#212529"
                                                    : "#dee2e6",
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                <motion.div
                                    className="position-relative bg-white d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        zIndex: 1,
                                    }}
                                    initial={{
                                        scale: 0.8,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.3,
                                    }}
                                >
                                    {isCompleted ? (
                                        <Icon
                                            size={25}
                                            strokeWidth={2}
                                        />
                                    ) : (
                                        <Circle
                                            size={22}
                                            strokeWidth={1.5}
                                            className="text-muted"
                                        />
                                    )}
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    className="ms-3 pb-4"
                                    initial={{
                                        opacity: 0,
                                        x: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.3,
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-2 flex-wrap">

                                        <h6
                                            className={`mb-1 ${isCompleted
                                                    ? "fw-bold"
                                                    : "fw-medium text-muted"
                                                }`}
                                        >
                                            {step.label}
                                        </h6>

                                        {isCurrent && (
                                            <span className="badge text-bg-dark">
                                                Current
                                            </span>
                                        )}

                                    </div>

                                    <p
                                        className={`small mb-0 ${isCompleted
                                                ? "text-muted"
                                                : "text-muted opacity-75"
                                            }`}
                                    >
                                        {step.description}
                                    </p>
                                </motion.div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </motion.div>
    );
}

export default OrderStatusTimeline;