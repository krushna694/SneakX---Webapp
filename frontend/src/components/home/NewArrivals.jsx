import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import ProductCard from "../product/ProductCard";
import { getProductsApi } from "../../api/productApi";
import "../../pages/Home/Home.css";

function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadNewArrivals = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await getProductsApi({
                    page: 0,
                    size: 4,
                    sort: "createdAt,desc",
                });

                if (!response?.success) {
                    throw new Error(
                        response?.message ||
                        "Failed to load new arrivals."
                    );
                }

                const backendProducts =
                    response.data?.content || [];

                const normalizedProducts =
                    backendProducts.map((product) => ({
                        ...product,

                        id: product.id,

                        name: product.name,

                        category:
                            product.categoryName,

                        price: Number(
                            product.discountedPrice ??
                            product.price ??
                            0
                        ),

                        originalPrice: Number(
                            product.price ?? 0
                        ),
                    }));

                if (isMounted) {
                    setProducts(normalizedProducts);
                }
            } catch (error) {
                console.error(
                    "Failed to load new arrivals:",
                    error
                );

                if (isMounted) {
                    setError(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to load new arrivals."
                    );

                    setProducts([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadNewArrivals();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="sx-home-section sx-product-section">
            <div className="container">

                {/* Section Heading */}
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
                        onClick={() => {
                            window.location.href =
                                "/products";
                        }}
                    >
                        Explore Collection
                        <ArrowUpRight size={15} />
                    </motion.button>

                </motion.div>

                {/* Loading */}
                {isLoading && (
                    <div className="row g-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                className="col-6 col-md-3"
                                key={item}
                            >
                                <div
                                    style={{
                                        minHeight: "420px",
                                        borderRadius: "20px",
                                        background:
                                            "#f5f5f3",
                                        border:
                                            "1px solid #e9e9e7",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!isLoading && error && (
                    <div
                        className="text-center py-5"
                        style={{
                            color: "#777",
                        }}
                    >
                        Unable to load new arrivals.
                    </div>
                )}

                {/* Products */}
                {!isLoading &&
                    !error &&
                    products.length > 0 && (
                        <div className="row g-4">

                            {products.map(
                                (product, index) => (
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
                                                delay:
                                                    index *
                                                    0.08,
                                            }}
                                        >
                                            <ProductCard
                                                product={
                                                    product
                                                }
                                            />
                                        </motion.div>
                                    </div>
                                )
                            )}

                        </div>
                    )}

                {/* Empty */}
                {!isLoading &&
                    !error &&
                    products.length === 0 && (
                        <div
                            className="text-center py-5"
                            style={{
                                color: "#777",
                            }}
                        >
                            No new arrivals available.
                        </div>
                    )}

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
                            onClick={() => {
                                window.location.href =
                                    "/products";
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