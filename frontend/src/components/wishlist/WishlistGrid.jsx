import { motion } from "framer-motion";
import WishlistItem from "./WishlistItem";

function WishlistGrid({ products }) {
    return (
        <motion.div
            className="row g-4"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                    },
                },
            }}
        >
            {products.map((product) => (
                <motion.div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={product.id}
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 20,
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                        },
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <WishlistItem product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
}

export default WishlistGrid;