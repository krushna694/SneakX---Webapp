import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "../product/ProductCard";
import "../../pages/Home/Home.css";

const products = [
    {
        id: 1,
        name: "Air Runner",
        price: 4999,
    },
    {
        id: 2,
        name: "Street Force",
        price: 5999,
    },
    {
        id: 3,
        name: "Urban Classic",
        price: 4499,
    },
    {
        id: 4,
        name: "Sport Max",
        price: 6999,
    },
];

function FeaturedProducts() {
    return (
        <section className="sx-home-section sx-home-section-soft sx-product-section">
            <div className="container">

                <motion.div
                    className="sx-section-heading"
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                >
                    <div>

                        <p className="sx-section-kicker">
                            <Flame
                                size={13}
                                className="me-1"
                            />
                            Trending Now
                        </p>

                        <h2 className="sx-home-title">
                            Featured Sneakers
                        </h2>

                        <p className="sx-home-subtitle">
                            Our popular picks.
                        </p>

                    </div>

                    <motion.button
                        type="button"
                        className="sx-view-all"
                        whileHover={{
                            x: 3,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        View All
                        <ArrowRight size={15} />
                    </motion.button>

                </motion.div>

                <div className="row g-4">

                    {products.map((product, index) => (
                        <div
                            className="col-6 col-md-3"
                            key={product.id}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 35,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.08,
                                }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default FeaturedProducts;