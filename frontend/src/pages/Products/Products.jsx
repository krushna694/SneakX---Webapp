import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    Check,
    ChevronDown,
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";
import ProductGrid from "../../components/product/ProductGrid";

const products = [
    {
        id: 1,
        name: "Air Runner",
        price: 4999,
        category: "Running",
    },
    {
        id: 2,
        name: "Street Force",
        price: 5999,
        category: "Lifestyle",
    },
    {
        id: 3,
        name: "Urban Classic",
        price: 4499,
        category: "Lifestyle",
    },
    {
        id: 4,
        name: "Sport Max",
        price: 6999,
        category: "Sports",
    },
    {
        id: 5,
        name: "Velocity X",
        price: 5499,
        category: "Running",
    },
    {
        id: 6,
        name: "Street Runner",
        price: 4799,
        category: "Lifestyle",
    },
    {
        id: 7,
        name: "Air Motion",
        price: 6299,
        category: "Sports",
    },
    {
        id: 8,
        name: "Classic Low",
        price: 3999,
        category: "Lifestyle",
    },
];

const categories = [
    "All",
    "Running",
    "Lifestyle",
    "Basketball",
    "Sports",
];

const sortOptions = [
    {
        value: "featured",
        label: "Featured",
    },
    {
        value: "price-low",
        label: "Price: Low to High",
    },
    {
        value: "price-high",
        label: "Price: High to Low",
    },
    {
        value: "name",
        label: "Name: A-Z",
    },
];

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryFromUrl = searchParams.get("category");

    const initialCategory = categories.includes(categoryFromUrl)
        ? categoryFromUrl
        : "All";

    const selectedCategory = initialCategory;

    const [searchTerm, setSearchTerm] = useState("");

    const [sortBy, setSortBy] = useState("featured");

    const [showFilters, setShowFilters] = useState(false);

    const [showSort, setShowSort] = useState(false);

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    /*
     * Keep selected category synchronized
     * with the URL.
     *
     * Example:
     * /products?category=Running
     *        ↓
     * selectedCategory = "Running"
     */
    const handleCategoryChange = (category) => {
        const newParams = new URLSearchParams(searchParams);

        if (category === "All") {
            newParams.delete("category");
        } else {
            newParams.set("category", category);
        }

        setSearchParams(newParams);
    };


    /*
     * Update category and URL together.
     */

    const filteredProducts = useMemo(() => {
        let result = [...products];

        /* Category */
        if (selectedCategory !== "All") {
            result = result.filter(
                (product) =>
                    product.category === selectedCategory
            );
        }

        /* Search */
        if (searchTerm.trim()) {
            const search =
                searchTerm.trim().toLowerCase();

            result = result.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search)
            );
        }

        /* Minimum price */
        if (minPrice !== "") {
            result = result.filter(
                (product) =>
                    product.price >= Number(minPrice)
            );
        }

        /* Maximum price */
        if (maxPrice !== "") {
            result = result.filter(
                (product) =>
                    product.price <= Number(maxPrice)
            );
        }

        /* Sorting */
        switch (sortBy) {
            case "price-low":
                result.sort(
                    (a, b) => a.price - b.price
                );
                break;

            case "price-high":
                result.sort(
                    (a, b) => b.price - a.price
                );
                break;

            case "name":
                result.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            default:
                break;
        }

        return result;
    }, [
        selectedCategory,
        searchTerm,
        sortBy,
        minPrice,
        maxPrice,
    ]);

    const clearFilters = () => {
        setSearchTerm("");
        setSortBy("featured");
        setMinPrice("");
        setMaxPrice("");

        const newParams = new URLSearchParams(searchParams);
        newParams.delete("category");

        setSearchParams(newParams);
    };

    const hasActiveFilters =
        selectedCategory !== "All" ||
        searchTerm !== "" ||
        minPrice !== "" ||
        maxPrice !== "" ||
        sortBy !== "featured";

    const selectedSortLabel =
        sortOptions.find(
            (option) => option.value === sortBy
        )?.label || "Featured";

    return (
        <main className="bg-white">

            {/* =========================================
                HERO
            ========================================== */}

            <section
                className="position-relative overflow-hidden"
                style={{
                    background: "#0b0b0c",
                    color: "#ffffff",
                }}
            >

                {/* Orange glow */}
                <motion.div
                    className="position-absolute rounded-circle"
                    style={{
                        width: "420px",
                        height: "420px",
                        top: "-250px",
                        right: "-80px",
                        background:
                            "rgba(255, 90, 31, 0.13)",
                        filter: "blur(55px)",
                        pointerEvents: "none",
                    }}
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="container py-5 position-relative">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.65,
                        }}
                    >

                        <div
                            className="d-flex align-items-center gap-2 mb-3"
                            style={{
                                color: "#ff5a1f",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                letterSpacing: "0.13em",
                                textTransform: "uppercase",
                            }}
                        >

                            <span
                                style={{
                                    width: "26px",
                                    height: "2px",
                                    background:
                                        "#ff5a1f",
                                }}
                            />

                            The Collection
                        </div>

                        <h1
                            className="fw-bold mb-3"
                            style={{
                                color: "#ffffff",
                                fontSize:
                                    "clamp(3rem, 7vw, 5.5rem)",
                                lineHeight: 0.95,
                                letterSpacing: "-0.06em",
                            }}
                        >
                            {selectedCategory === "All"
                                ? "All Sneakers"
                                : selectedCategory}

                            <span
                                style={{
                                    color: "#ff5a1f",
                                }}
                            >
                                .
                            </span>
                        </h1>

                        <p
                            className="mb-0"
                            style={{
                                maxWidth: "560px",
                                color:
                                    "rgba(255,255,255,0.58)",
                                fontSize: "1rem",
                                lineHeight: 1.7,
                            }}
                        >
                            Explore our collection and
                            find the pair that fits your
                            movement, style and
                            personality.
                        </p>

                    </motion.div>

                </div>
            </section>

            {/* =========================================
                CONTROLS
            ========================================== */}

            <section className="container pt-5">

                <div className="row g-3 align-items-center">

                    {/* Search */}
                    <div className="col-lg-7">

                        <div
                            className="d-flex align-items-center gap-3 px-3"
                            style={{
                                minHeight: "54px",
                                border:
                                    "1px solid #e3e3e1",
                                borderRadius: "14px",
                                background: "#ffffff",
                                boxShadow:
                                    "0 5px 20px rgba(0,0,0,0.035)",
                            }}
                        >

                            <Search
                                size={19}
                                color="#777"
                            />

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                                placeholder="Search sneakers..."
                                className="border-0 shadow-none flex-grow-1"
                                style={{
                                    outline: "none",
                                    fontSize: "0.9rem",
                                }}
                                aria-label="Search sneakers"
                            />

                            {searchTerm && (
                                <motion.button
                                    type="button"
                                    className="btn p-0 d-flex"
                                    onClick={() =>
                                        setSearchTerm("")
                                    }
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    aria-label="Clear search"
                                >
                                    <X
                                        size={17}
                                        color="#777"
                                    />
                                </motion.button>
                            )}

                        </div>

                    </div>

                    {/* Filters + Sort */}
                    <div className="col-lg-5">

                        <div className="d-flex gap-2">

                            {/* Filter Button */}
                            <motion.button
                                type="button"
                                className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                onClick={() =>
                                    setShowFilters(
                                        !showFilters
                                    )
                                }
                                whileTap={{
                                    scale: 0.97,
                                }}
                                style={{
                                    minHeight: "54px",
                                    border:
                                        showFilters
                                            ? "1px solid #111"
                                            : "1px solid #e3e3e1",
                                    borderRadius: "14px",
                                    background:
                                        showFilters
                                            ? "#111"
                                            : "#fff",
                                    color:
                                        showFilters
                                            ? "#fff"
                                            : "#222",
                                    fontWeight: 700,
                                    transition:
                                        "all 200ms ease",
                                }}
                            >

                                <SlidersHorizontal
                                    size={17}
                                />

                                Filters

                                {hasActiveFilters && (
                                    <span
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius:
                                                "50%",
                                            background:
                                                "#ff5a1f",
                                            color: "#fff",
                                            fontSize:
                                                "0.65rem",
                                        }}
                                    >
                                        !
                                    </span>
                                )}

                            </motion.button>

                            {/* Custom Sort */}
                            <div
                                className="position-relative"
                                style={{
                                    minWidth: "185px",
                                }}
                            >

                                <motion.button
                                    type="button"
                                    className="btn w-100 d-flex align-items-center justify-content-between gap-2"
                                    onClick={() =>
                                        setShowSort(
                                            !showSort
                                        )
                                    }
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    style={{
                                        minHeight: "54px",
                                        border:
                                            showSort
                                                ? "1px solid #111"
                                                : "1px solid #e3e3e1",
                                        borderRadius: "14px",
                                        background: "#fff",
                                        color: "#222",
                                        fontWeight: 700,
                                    }}
                                >

                                    <span className="text-truncate">
                                        {selectedSortLabel}
                                    </span>

                                    <motion.span
                                        animate={{
                                            rotate:
                                                showSort
                                                    ? 180
                                                    : 0,
                                        }}
                                    >
                                        <ChevronDown
                                            size={17}
                                        />
                                    </motion.span>

                                </motion.button>

                                <AnimatePresence>
                                    {showSort && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -5,
                                                scale: 0.98,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 5,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -5,
                                                scale: 0.98,
                                            }}
                                            transition={{
                                                duration: 0.18,
                                            }}
                                            className="position-absolute end-0 mt-2 bg-white"
                                            style={{
                                                zIndex: 20,
                                                width: "230px",
                                                border:
                                                    "1px solid #e5e5e3",
                                                borderRadius:
                                                    "14px",
                                                padding: "7px",
                                                boxShadow:
                                                    "0 18px 45px rgba(0,0,0,0.13)",
                                            }}
                                        >

                                            {sortOptions.map(
                                                (option) => (
                                                    <motion.button
                                                        key={
                                                            option.value
                                                        }
                                                        type="button"
                                                        onClick={() => {
                                                            setSortBy(
                                                                option.value
                                                            );
                                                            setShowSort(
                                                                false
                                                            );
                                                        }}
                                                        whileHover={{
                                                            x: 3,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                        className="w-100 border-0 d-flex align-items-center justify-content-between"
                                                        style={{
                                                            padding:
                                                                "11px 12px",
                                                            borderRadius:
                                                                "9px",
                                                            background:
                                                                sortBy ===
                                                                    option.value
                                                                    ? "#f3f3f1"
                                                                    : "transparent",
                                                            color:
                                                                "#222",
                                                            fontSize:
                                                                "0.82rem",
                                                            fontWeight:
                                                                600,
                                                            textAlign:
                                                                "left",
                                                        }}
                                                    >
                                                        {option.label}

                                                        {sortBy ===
                                                            option.value && (
                                                                <Check
                                                                    size={
                                                                        16
                                                                    }
                                                                    color="#ff5a1f"
                                                                />
                                                            )}
                                                    </motion.button>
                                                )
                                            )}

                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================
                    FILTER PANEL
                ====================================== */}

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            style={{
                                overflow: "hidden",
                            }}
                        >

                            <div
                                className="mt-3 p-4 p-lg-4"
                                style={{
                                    border:
                                        "1px solid #e5e5e3",
                                    borderRadius: "18px",
                                    background: "#fafaf8",
                                }}
                            >

                                <div className="row g-4 align-items-end">

                                    {/* Category */}
                                    <div className="col-lg-5">

                                        <p
                                            className="mb-2"
                                            style={{
                                                fontSize:
                                                    "0.72rem",
                                                fontWeight: 800,
                                                textTransform:
                                                    "uppercase",
                                                letterSpacing:
                                                    "0.08em",
                                                color:
                                                    "#777",
                                            }}
                                        >
                                            Category
                                        </p>

                                        <div className="d-flex flex-wrap gap-2">

                                            {categories.map(
                                                (category) => (
                                                    <motion.button
                                                        key={
                                                            category
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            handleCategoryChange(
                                                                category
                                                            )
                                                        }
                                                        whileHover={{
                                                            y: -2,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="btn"
                                                        style={{
                                                            borderRadius:
                                                                "100px",
                                                            padding:
                                                                "8px 14px",
                                                            border:
                                                                selectedCategory ===
                                                                    category
                                                                    ? "1px solid #111"
                                                                    : "1px solid #dededc",
                                                            background:
                                                                selectedCategory ===
                                                                    category
                                                                    ? "#111"
                                                                    : "#fff",
                                                            color:
                                                                selectedCategory ===
                                                                    category
                                                                    ? "#fff"
                                                                    : "#555",
                                                            fontSize:
                                                                "0.75rem",
                                                            fontWeight:
                                                                700,
                                                        }}
                                                    >
                                                        {category}
                                                    </motion.button>
                                                )
                                            )}

                                        </div>

                                    </div>

                                    {/* Minimum Price */}
                                    <div className="col-sm-6 col-lg-2">

                                        <label
                                            htmlFor="minPrice"
                                            className="form-label"
                                            style={{
                                                fontSize:
                                                    "0.72rem",
                                                fontWeight: 800,
                                                textTransform:
                                                    "uppercase",
                                                letterSpacing:
                                                    "0.08em",
                                                color:
                                                    "#777",
                                            }}
                                        >
                                            Min Price
                                        </label>

                                        <div
                                            className="d-flex align-items-center px-3"
                                            style={{
                                                height: "44px",
                                                border:
                                                    "1px solid #dededc",
                                                borderRadius:
                                                    "10px",
                                                background:
                                                    "#fff",
                                            }}
                                        >

                                            <span
                                                style={{
                                                    color:
                                                        "#999",
                                                    fontSize:
                                                        "0.8rem",
                                                }}
                                            >
                                                ₹
                                            </span>

                                            <input
                                                id="minPrice"
                                                type="number"
                                                min="0"
                                                value={
                                                    minPrice
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setMinPrice(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder="Min"
                                                className="border-0 bg-transparent w-100 ms-2"
                                                style={{
                                                    outline:
                                                        "none",
                                                    fontSize:
                                                        "0.8rem",
                                                }}
                                            />

                                        </div>

                                    </div>

                                    {/* Maximum Price */}
                                    <div className="col-sm-6 col-lg-2">

                                        <label
                                            htmlFor="maxPrice"
                                            className="form-label"
                                            style={{
                                                fontSize:
                                                    "0.72rem",
                                                fontWeight: 800,
                                                textTransform:
                                                    "uppercase",
                                                letterSpacing:
                                                    "0.08em",
                                                color:
                                                    "#777",
                                            }}
                                        >
                                            Max Price
                                        </label>

                                        <div
                                            className="d-flex align-items-center px-3"
                                            style={{
                                                height: "44px",
                                                border:
                                                    "1px solid #dededc",
                                                borderRadius:
                                                    "10px",
                                                background:
                                                    "#fff",
                                            }}
                                        >

                                            <span
                                                style={{
                                                    color:
                                                        "#999",
                                                    fontSize:
                                                        "0.8rem",
                                                }}
                                            >
                                                ₹
                                            </span>

                                            <input
                                                id="maxPrice"
                                                type="number"
                                                min="0"
                                                value={
                                                    maxPrice
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setMaxPrice(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder="Max"
                                                className="border-0 bg-transparent w-100 ms-2"
                                                style={{
                                                    outline:
                                                        "none",
                                                    fontSize:
                                                        "0.8rem",
                                                }}
                                            />

                                        </div>

                                    </div>

                                    {/* Clear */}
                                    <div className="col-lg-3">

                                        <motion.button
                                            type="button"
                                            onClick={
                                                clearFilters
                                            }
                                            whileHover={{
                                                y: -2,
                                            }}
                                            whileTap={{
                                                scale: 0.98,
                                            }}
                                            className="btn w-100"
                                            style={{
                                                height: "44px",
                                                border:
                                                    "1px solid #dededc",
                                                borderRadius:
                                                    "10px",
                                                background:
                                                    "#fff",
                                                fontSize:
                                                    "0.8rem",
                                                fontWeight: 700,
                                            }}
                                        >
                                            Clear All Filters
                                        </motion.button>

                                    </div>

                                </div>

                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* =====================================
                    CATEGORY PILLS
                ====================================== */}

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4 mb-5">

                    <div className="d-flex flex-wrap gap-2">

                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                type="button"
                                onClick={() =>
                                    handleCategoryChange(
                                        category
                                    )
                                }
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                className="btn"
                                style={{
                                    borderRadius: "100px",
                                    padding: "9px 18px",
                                    border:
                                        selectedCategory ===
                                            category
                                            ? "1px solid #111"
                                            : "1px solid #dededc",
                                    background:
                                        selectedCategory ===
                                            category
                                            ? "#111"
                                            : "#fff",
                                    color:
                                        selectedCategory ===
                                            category
                                            ? "#fff"
                                            : "#555",
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                }}
                            >
                                {category}
                            </motion.button>
                        ))}

                    </div>

                    {hasActiveFilters && (
                        <motion.button
                            type="button"
                            onClick={clearFilters}
                            initial={{
                                opacity: 0,
                                x: 10,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            whileHover={{
                                x: -2,
                            }}
                            className="btn btn-link text-dark text-decoration-none p-0"
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                            }}
                        >
                            Clear filters
                        </motion.button>
                    )}

                </div>

                {/* =====================================
                    RESULTS
                ====================================== */}

                <div className="d-flex align-items-end justify-content-between mb-4">

                    <div>

                        <h2
                            className="mb-1"
                            style={{
                                fontSize: "1.45rem",
                                fontWeight: 700,
                                letterSpacing:
                                    "-0.03em",
                            }}
                        >
                            {selectedCategory === "All"
                                ? "All Sneakers"
                                : selectedCategory}
                        </h2>

                        <p
                            className="mb-0"
                            style={{
                                color: "#858589",
                                fontSize: "0.82rem",
                            }}
                        >
                            {filteredProducts.length}{" "}
                            {filteredProducts.length === 1
                                ? "product"
                                : "products"}{" "}
                            found
                        </p>

                    </div>

                </div>

                {/* =====================================
                    PRODUCT GRID
                ====================================== */}

                <AnimatePresence mode="wait">

                    {filteredProducts.length > 0 ? (
                        <motion.div
                            key={`${selectedCategory}-${searchTerm}-${sortBy}-${minPrice}-${maxPrice}`}
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        >
                            <ProductGrid
                                products={filteredProducts}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            className="text-center py-5"
                        >

                            <div
                                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "18px",
                                    background:
                                        "#f1f1ef",
                                }}
                            >
                                <Search
                                    size={25}
                                    color="#777"
                                />
                            </div>

                            <h3
                                className="fw-bold"
                                style={{
                                    fontSize: "1.25rem",
                                }}
                            >
                                No sneakers found
                            </h3>

                            <p
                                className="text-muted mb-4"
                                style={{
                                    fontSize: "0.9rem",
                                }}
                            >
                                Try adjusting your search
                                or filters.
                            </p>

                            <motion.button
                                type="button"
                                onClick={clearFilters}
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="btn btn-dark px-4"
                            >
                                Clear Filters
                            </motion.button>

                        </motion.div>
                    )}

                </AnimatePresence>

                <div style={{ height: "100px" }} />

            </section>

        </main>
    );
}

export default Products;