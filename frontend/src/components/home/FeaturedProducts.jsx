import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

import ProductCard from "../product/ProductCard";
import { getProductsApi } from "../../api/productApi";
import "../../pages/Home/Home.css";

function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadFeaturedProducts = async () => {
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
                        "Failed to load featured products."
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
                    "Failed to load featured products:",
                    error
                );

                if (isMounted) {
                    setError(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to load featured products."
                    );

                    setProducts([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadFeaturedProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="sx-home-section sx-home-section-soft sx-product-section">
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
                        onClick={() => {
                            window.location.href =
                                "/products";
                        }}
                    >
                        View All
                        <ArrowRight size={15} />
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
                                        background: "#f5f5f3",
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
                        Unable to load featured sneakers.
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
                            No featured sneakers available.
                        </div>
                    )}

            </div>
        </section>
    );
}

export default FeaturedProducts;