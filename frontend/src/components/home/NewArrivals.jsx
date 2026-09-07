import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProductCard from "../product/ProductCard";
import "../../pages/Home/home.css";

const products = [
    {
        id: 5,
        name: "Velocity X",
        price: 5499,
    },
    {
        id: 6,
        name: "Street Runner",
        price: 4799,
    },
    {
        id: 7,
        name: "Air Motion",
        price: 6299,
    },
    {
        id: 8,
        name: "Classic Low",
        price: 3999,
    },
];

function NewArrivals() {
    return (
        <section className="sx-home-section sx-product-section">
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
                            <Sparkles
                                size={13}
                                className="me-1"
                            />
                            Just Dropped
                        </p>

                        <h2 className="sx-home-title">
                            New Arrivals
                        </h2>

                        <p className="sx-home-subtitle">
                            Fresh sneakers just for you.
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
                        Explore Collection
                        <ArrowUpRight size={15} />
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

                {/* Premium CTA */}
                <motion.div
                    className="sx-home-cta"
                    initial={{
                        opacity: 0,
                        scale: 0.98,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                >
                    <div className="sx-home-cta-content">

                        <p className="sx-section-kicker">
                            Your next pair awaits
                        </p>

                        <h2>
                            Move different.
                            <br />
                            Wear SneakX.
                        </h2>

                        <p>
                            Explore the collection and find
                            the pair that fits your style.
                        </p>

                        <motion.button
                            type="button"
                            className="sx-hero-primary"
                            whileHover={{
                                scale: 1.04,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                        >
                            Shop Sneakers
                            <ArrowUpRight size={17} />
                        </motion.button>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default NewArrivals;