import { motion } from "framer-motion";
import {
    ArrowRight,
    Dumbbell,
    Footprints,
    Trophy,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../../pages/Home/home.css";

const categories = [
    {
        name: "Running",
        icon: Footprints,
    },
    {
        name: "Lifestyle",
        icon: Zap,
    },
    {
        name: "Basketball",
        icon: Trophy,
    },
    {
        name: "Sports",
        icon: Dumbbell,
    },
];

function CategorySection() {
    return (
        <section className="sx-home-section">
            <div className="container">

                <motion.div
                    className="sx-section-heading sx-section-heading-centered"
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                >
                    <div>
                        <p className="sx-section-kicker">
                            Find Your Fit
                        </p>

                        <h2 className="sx-home-title">
                            Shop By Category
                        </h2>

                        <p className="sx-home-subtitle">
                            Find sneakers that match your style.
                        </p>
                    </div>
                </motion.div>

                <div className="row g-4">

                    {categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <div
                                className="col-6 col-md-3"
                                key={category.name}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{
                                        y: -7,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                >
                                    <Link
                                        to={`/products?category=${encodeURIComponent(
                                            category.name
                                        )}`}
                                        className="text-decoration-none"
                                        style={{
                                            display: "block",
                                            color: "inherit",
                                        }}
                                    >
                                        <div className="sx-category-card">

                                            <span className="sx-category-number">
                                                0{index + 1}
                                            </span>

                                            <div className="sx-category-icon">
                                                <Icon size={22} />
                                            </div>

                                            <h3 className="sx-category-name">
                                                {category.name}
                                            </h3>

                                            <span className="sx-category-explore">
                                                Explore
                                                <ArrowRight size={15} />
                                            </span>

                                        </div>
                                    </Link>
                                </motion.div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}

export default CategorySection;