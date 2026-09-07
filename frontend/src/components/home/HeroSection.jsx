import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import "../../pages/Home/home.css";

function HeroSection() {
    return (
        <section className="sx-hero">

            <div className="container">
                <div className="row align-items-center sx-hero-content">

                    {/* Hero Content */}
                    <div className="col-lg-6">

                        <motion.div
                            className="sx-hero-eyebrow"
                            initial={{
                                opacity: 0,
                                x: -20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                        >
                            <Sparkles size={15} />
                            Step Into Style
                        </motion.div>

                        <motion.h1
                            className="sx-hero-title"
                            initial={{
                                opacity: 0,
                                y: 35,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            Find Your
                            <span className="sx-hero-title-accent">
                                Perfect Pair.
                            </span>
                        </motion.h1>

                        <motion.p
                            className="sx-hero-description"
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.3,
                            }}
                        >
                            Discover sneakers designed for
                            movement, expression and everyday
                            confidence.
                        </motion.p>

                        <motion.div
                            className="sx-hero-actions"
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.45,
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    to="/products"
                                    className="sx-hero-primary"
                                >
                                    Shop Collection
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    to="/products"
                                    className="sx-hero-secondary"
                                >
                                    Explore Sneakers
                                    <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="sx-hero-stats"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.65,
                            }}
                        >
                            <div className="sx-hero-stat">
                                <strong>08+</strong>
                                <span>Styles</span>
                            </div>

                            <div className="sx-hero-stat">
                                <strong>04</strong>
                                <span>Categories</span>
                            </div>

                            <div className="sx-hero-stat">
                                <strong>24/7</strong>
                                <span>Style</span>
                            </div>
                        </motion.div>

                    </div>

                    {/* Hero Visual */}
                    <div className="col-lg-6">

                        <motion.div
                            className="sx-hero-visual"
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >

                            <motion.div
                                className="sx-hero-orbit"
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 90,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            <div className="sx-hero-glow" />

                            <motion.div
                                className="sx-sneaker"
                                animate={{
                                    y: [0, -14, 0],
                                    rotate: [-12, -10, -12],
                                }}
                                transition={{
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="sx-sneaker-upper" />
                                <div className="sx-sneaker-sole" />
                                <div className="sx-sneaker-accent" />
                            </motion.div>

                            <motion.div
                                className="sx-hero-label"
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                NEW SEASON / 2026
                            </motion.div>

                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroSection;