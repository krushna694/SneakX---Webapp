import { motion } from "framer-motion";
import WishlistItem from "./WishlistItem";

function WishlistGrid({ products = [] }) {
    if (!products.length) {
        return null;
    }

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
            {products.map((product, index) => {
                /*
                 * wishlistItemId is the unique backend
                 * wishlist record ID.
                 *
                 * product.id is the actual product ID.
                 *
                 * Use wishlistItemId first so React always
                 * receives a stable key even if product data
                 * changes later.
                 */
                const itemKey =
                    product?.wishlistItemId ??
                    product?.id ??
                    `wishlist-item-${index}`;

                return (
                    <motion.div
                        key={itemKey}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
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
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                    >
                        <WishlistItem
                            product={product}
                        />
                    </motion.div>
                );
            })}
        </motion.div>
    );
}

export default WishlistGrid;