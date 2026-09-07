import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Maximize2,
    Sparkles,
    X,
} from "lucide-react";

function ProductGallery({ product }) {
    const [activeImage, setActiveImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const galleryItems = [
        {
            label: "01",
            position: "center",
            scale: 1,
            rotate: -7,
        },
        {
            label: "02",
            position: "left center",
            scale: 0.92,
            rotate: -3,
        },
        {
            label: "03",
            position: "right center",
            scale: 0.96,
            rotate: 3,
        },
    ];

    const currentItem = galleryItems[activeImage];

    const previousImage = () => {
        setActiveImage((current) =>
            current === 0
                ? galleryItems.length - 1
                : current - 1
        );
    };

    const nextImage = () => {
        setActiveImage((current) =>
            current === galleryItems.length - 1
                ? 0
                : current + 1
        );
    };

    return (
        <div>
            {/* =====================================================
                MAIN PRODUCT SHOWCASE
            ====================================================== */}

            <motion.div
                className="position-relative overflow-hidden"
                style={{
                    minHeight: "520px",
                    borderRadius: "28px",
                    background:
                        "radial-gradient(circle at 70% 45%, rgba(255,90,31,0.14), transparent 32%), linear-gradient(145deg, #f8f8f6 0%, #eeeeeb 100%)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow:
                        "0 25px 70px rgba(0,0,0,0.08)",
                }}
                initial={{
                    opacity: 0,
                    x: -30,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* =================================================
                    AMBIENT ORANGE GLOW
                ================================================== */}

                <motion.div
                    className="position-absolute rounded-circle"
                    style={{
                        width: "420px",
                        height: "420px",
                        left: "50%",
                        top: "50%",
                        transform:
                            "translate(-50%, -50%)",
                        background:
                            "rgba(255,90,31,0.09)",
                        filter: "blur(75px)",
                        pointerEvents: "none",
                    }}
                    animate={{
                        scale: [1, 1.12, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* =================================================
                    DECORATIVE RINGS
                ================================================== */}

                <motion.div
                    className="position-absolute top-50 start-50 translate-middle rounded-circle"
                    style={{
                        width: "390px",
                        height: "390px",
                        border:
                            "1px solid rgba(17,17,17,0.07)",
                        pointerEvents: "none",
                    }}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                <motion.div
                    className="position-absolute top-50 start-50 translate-middle rounded-circle"
                    style={{
                        width: "300px",
                        height: "300px",
                        border:
                            "1px dashed rgba(17,17,17,0.05)",
                        pointerEvents: "none",
                    }}
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* =================================================
                    FLOATING ACCENT DOTS
                ================================================== */}

                <motion.span
                    className="position-absolute rounded-circle"
                    style={{
                        width: "9px",
                        height: "9px",
                        top: "21%",
                        right: "17%",
                        background:
                            "var(--sx-accent)",
                        boxShadow:
                            "0 0 18px rgba(255,90,31,0.55)",
                    }}
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.span
                    className="position-absolute rounded-circle"
                    style={{
                        width: "5px",
                        height: "5px",
                        bottom: "25%",
                        left: "18%",
                        background: "#111111",
                        opacity: 0.25,
                    }}
                    animate={{
                        y: [0, 8, 0],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* =================================================
                    COLLECTION LABEL
                ================================================== */}

                <motion.div
                    className="position-absolute top-0 start-0 m-4 d-flex align-items-center gap-2"
                    style={{
                        zIndex: 5,
                        color: "#737377",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        letterSpacing: "0.11em",
                        textTransform: "uppercase",
                    }}
                    initial={{
                        opacity: 0,
                        y: -8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.45,
                    }}
                >
                    <Sparkles
                        size={14}
                        color="var(--sx-accent)"
                    />

                    SneakX Collection
                </motion.div>

                {/* =================================================
                    IMAGE / EXPAND BUTTON
                ================================================== */}

                <motion.button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="position-absolute top-0 end-0 m-4 d-flex align-items-center justify-content-center border-0"
                    style={{
                        zIndex: 5,
                        width: "44px",
                        height: "44px",
                        borderRadius: "13px",
                        background:
                            "rgba(255,255,255,0.72)",
                        color: "#222",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter:
                            "blur(14px)",
                        boxShadow:
                            "0 8px 25px rgba(0,0,0,0.07)",
                    }}
                    whileHover={{
                        scale: 1.06,
                        rotate: 3,
                    }}
                    whileTap={{
                        scale: 0.94,
                    }}
                    aria-label="Expand product image"
                >
                    <Maximize2 size={17} />
                </motion.button>

                {/* =================================================
                    PRODUCT VISUAL
                ================================================== */}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeImage}
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{
                            width: "min(62%, 310px)",
                            height: "185px",
                            borderRadius:
                                "60% 45% 38% 30%",
                            background:
                                "linear-gradient(145deg, #ffffff 0%, #f1f1f2 45%, #c1c1c5 100%)",
                            boxShadow:
                                "35px 35px 48px rgba(0,0,0,0.18)",
                            transformOrigin: "center",
                            zIndex: 2,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.82,
                            x:
                                activeImage === 0
                                    ? -35
                                    : activeImage === 1
                                        ? -60
                                        : 35,
                        }}
                        animate={{
                            opacity: 1,
                            scale:
                                currentItem.scale *
                                (isHovered ? 1.06 : 1),
                            x: 0,
                            rotate:
                                currentItem.rotate +
                                (isHovered ? 2 : 0),
                            y: [0, -6, 0],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.85,
                        }}
                        transition={{
                            opacity: {
                                duration: 0.25,
                            },
                            scale: {
                                duration: 0.45,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            },
                            x: {
                                duration: 0.45,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            },
                            rotate: {
                                duration: 0.45,
                            },
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                    >
                        {/* Upper Highlight */}

                        <motion.span
                            style={{
                                position: "absolute",
                                width: "135px",
                                height: "62px",
                                top: "17px",
                                left: "48px",
                                borderTop:
                                    "5px solid rgba(255,255,255,0.92)",
                                borderRadius: "50%",
                                transform:
                                    "rotate(-10deg)",
                            }}
                            animate={{
                                opacity: isHovered
                                    ? 1
                                    : 0.8,
                            }}
                        />

                        {/* SneakX Orange Accent */}

                        <motion.span
                            style={{
                                position: "absolute",
                                width: "112px",
                                height: "43px",
                                left: "78px",
                                bottom: "38px",
                                borderLeft:
                                    "10px solid var(--sx-accent)",
                                borderBottom:
                                    "10px solid var(--sx-accent)",
                                borderRadius: "50%",
                                transform:
                                    "rotate(-20deg)",
                            }}
                            animate={{
                                scale: isHovered
                                    ? 1.08
                                    : 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        />

                        {/* Sole */}

                        <span
                            style={{
                                position: "absolute",
                                left: "-12px",
                                right: "-12px",
                                bottom: "-20px",
                                height: "38px",
                                borderRadius:
                                    "0 0 38px 38px",
                                background:
                                    "linear-gradient(#ffffff, #b7b7bb)",
                                boxShadow:
                                    "0 12px 18px rgba(0,0,0,0.1)",
                            }}
                        />

                        {/* Sole Detail */}

                        <span
                            style={{
                                position: "absolute",
                                left: "20px",
                                right: "20px",
                                bottom: "-5px",
                                height: "3px",
                                borderRadius: "10px",
                                background:
                                    "rgba(17,17,17,0.10)",
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* =================================================
                    PRODUCT NAME WATERMARK
                ================================================== */}

                <div
                    className="position-absolute start-50 translate-middle-x"
                    style={{
                        bottom: "95px",
                        color: "rgba(17,17,17,0.035)",
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.06em",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                    }}
                >
                    {product.name.toUpperCase()}
                </div>

                {/* =================================================
                    IMAGE COUNTER
                ================================================== */}

                <motion.div
                    className="position-absolute bottom-0 start-0 m-4 px-3 py-2 d-flex align-items-center gap-2"
                    style={{
                        zIndex: 5,
                        borderRadius: "100px",
                        background:
                            "rgba(255,255,255,0.75)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter:
                            "blur(14px)",
                        color: "#333",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        boxShadow:
                            "0 8px 25px rgba(0,0,0,0.06)",
                    }}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.4,
                    }}
                >
                    <span
                        style={{
                            color:
                                "var(--sx-accent)",
                        }}
                    >
                        {currentItem.label}
                    </span>

                    <span
                        style={{
                            color: "#aaa",
                        }}
                    >
                        /
                    </span>

                    03
                </motion.div>

                {/* =================================================
                    PREVIOUS / NEXT
                ================================================== */}

                <div
                    className="position-absolute bottom-0 end-0 m-4 d-flex gap-2"
                    style={{
                        zIndex: 5,
                    }}
                >
                    <motion.button
                        type="button"
                        onClick={previousImage}
                        className="d-flex align-items-center justify-content-center border-0"
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "13px",
                            background: "#111111",
                            color: "#ffffff",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.14)",
                        }}
                        whileHover={{
                            scale: 1.06,
                            x: -2,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        aria-label="Previous product image"
                    >
                        <ArrowLeft size={17} />
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={nextImage}
                        className="d-flex align-items-center justify-content-center border-0"
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "13px",
                            background:
                                "var(--sx-accent)",
                            color: "#ffffff",
                            boxShadow:
                                "0 10px 28px rgba(255,90,31,0.25)",
                        }}
                        whileHover={{
                            scale: 1.06,
                            x: 2,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        aria-label="Next product image"
                    >
                        <ArrowRight size={17} />
                    </motion.button>
                </div>
            </motion.div>

            {/* =====================================================
                THUMBNAILS
            ====================================================== */}

            <div className="row g-3 mt-1">

                {galleryItems.map((item, index) => (
                    <div
                        className="col-4"
                        key={item.label}
                    >
                        <motion.button
                            type="button"
                            onClick={() =>
                                setActiveImage(index)
                            }
                            className="position-relative overflow-hidden border-0 w-100"
                            style={{
                                height: "92px",
                                borderRadius: "16px",
                                background:
                                    index === activeImage
                                        ? "#efefec"
                                        : "#f7f7f5",
                                border:
                                    index === activeImage
                                        ? "2px solid var(--sx-accent)"
                                        : "1px solid #e5e5e2",
                                transition:
                                    "all 220ms ease",
                                boxShadow:
                                    index === activeImage
                                        ? "0 8px 24px rgba(255,90,31,0.10)"
                                        : "none",
                            }}
                            whileHover={{
                                y: -4,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            aria-label={`View product image ${index + 1
                                }`}
                        >
                            {/* Thumbnail number */}

                            <span
                                className="position-absolute top-0 start-0 m-2"
                                style={{
                                    fontSize:
                                        "0.6rem",
                                    fontWeight: 800,
                                    color:
                                        index ===
                                            activeImage
                                            ? "var(--sx-accent)"
                                            : "#999",
                                }}
                            >
                                {item.label}
                            </span>

                            {/* Mini sneaker */}

                            <motion.div
                                className="position-absolute top-50 start-50"
                                style={{
                                    width: "78px",
                                    height: "46px",
                                    borderRadius:
                                        "55% 45% 35% 30%",
                                    background:
                                        "linear-gradient(145deg, #ffffff, #c7c7ca)",
                                    boxShadow:
                                        "8px 10px 15px rgba(0,0,0,0.12)",
                                    transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
                                }}
                                animate={{
                                    y:
                                        index ===
                                            activeImage
                                            ? [0, -2, 0]
                                            : 0,
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat:
                                        index ===
                                            activeImage
                                            ? Infinity
                                            : 0,
                                    ease: "easeInOut",
                                }}
                            >
                                {/* Accent */}

                                <span
                                    style={{
                                        position:
                                            "absolute",
                                        width: "31px",
                                        height: "13px",
                                        left: "21px",
                                        bottom: "9px",
                                        borderLeft:
                                            "4px solid var(--sx-accent)",
                                        borderBottom:
                                            "4px solid var(--sx-accent)",
                                        borderRadius:
                                            "50%",
                                        transform:
                                            "rotate(-20deg)",
                                    }}
                                />

                                {/* Sole */}

                                <span
                                    style={{
                                        position:
                                            "absolute",
                                        left: "-3px",
                                        right: "-3px",
                                        bottom: "-5px",
                                        height: "9px",
                                        borderRadius:
                                            "0 0 10px 10px",
                                        background:
                                            "linear-gradient(#fff, #bdbdc0)",
                                    }}
                                />
                            </motion.div>
                        </motion.button>
                    </div>
                ))}
            </div>

            {/* =====================================================
    ZOOM LIGHTBOX
====================================================== */}

            <AnimatePresence>
                {isZoomOpen && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                            zIndex: 9999,
                            background: "rgba(0, 0, 0, 0.58)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            padding: "24px",
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        onClick={() => setIsZoomOpen(false)}
                    >
                        {/* 75% CENTERED ZOOM WINDOW */}

                        <motion.div
                            className="position-relative overflow-hidden"
                            style={{
                                width: "75vw",
                                height: "75vh",
                                maxWidth: "1400px",
                                maxHeight: "900px",
                                minWidth: "320px",
                                minHeight: "420px",
                                borderRadius: "28px",
                                background:
                                    "radial-gradient(circle at 70% 45%, rgba(255,90,31,0.14), transparent 32%), linear-gradient(145deg, #f8f8f6 0%, #eeeeeb 100%)",
                                border:
                                    "1px solid rgba(255,255,255,0.5)",
                                boxShadow:
                                    "0 35px 100px rgba(0,0,0,0.35)",
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.88,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.88,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >
                            {/* Zoom Header */}

                            <div
                                className="position-absolute top-0 start-0 w-100 d-flex align-items-center justify-content-between"
                                style={{
                                    padding: "20px 24px",
                                    zIndex: 10,
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontSize: "0.65rem",
                                            fontWeight: 800,
                                            letterSpacing:
                                                "0.12em",
                                            textTransform:
                                                "uppercase",
                                            color: "#999",
                                        }}
                                    >
                                        SneakX Collection
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: 800,
                                            color: "#111",
                                            marginTop: "3px",
                                        }}
                                    >
                                        {product.name}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    {/* Counter */}

                                    <div
                                        className="px-3 py-2"
                                        style={{
                                            borderRadius: "100px",
                                            background:
                                                "rgba(255,255,255,0.75)",
                                            backdropFilter:
                                                "blur(12px)",
                                            WebkitBackdropFilter:
                                                "blur(12px)",
                                            fontSize: "0.7rem",
                                            fontWeight: 800,
                                            color: "#555",
                                        }}
                                    >
                                        {currentItem.label} / 03
                                    </div>

                                    {/* Close */}

                                    <motion.button
                                        type="button"
                                        onClick={() =>
                                            setIsZoomOpen(false)
                                        }
                                        className="d-flex align-items-center justify-content-center border-0"
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            borderRadius: "13px",
                                            background: "#111",
                                            color: "#fff",
                                        }}
                                        whileHover={{
                                            scale: 1.06,
                                        }}
                                        whileTap={{
                                            scale: 0.94,
                                        }}
                                        aria-label="Close zoom"
                                    >
                                        <X size={18} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Zoomed Product */}

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    className="position-absolute top-50 start-50 translate-middle"
                                    style={{
                                        width: "70%",
                                        height: "65%",
                                        zIndex: 2,
                                    }}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.85,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.85,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                >
                                    {/* Large Sneaker */}

                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "65%",
                                            height: "42%",
                                            left: "17%",
                                            top: "29%",
                                            borderRadius:
                                                "60% 45% 38% 30%",
                                            background:
                                                "linear-gradient(145deg, #ffffff 0%, #f1f1f2 45%, #c1c1c5 100%)",
                                            boxShadow:
                                                "40px 40px 55px rgba(0,0,0,0.22)",
                                            transform: `rotate(${currentItem.rotate}deg) scale(${currentItem.scale})`,
                                        }}
                                    >
                                        {/* Highlight */}

                                        <span
                                            style={{
                                                position:
                                                    "absolute",
                                                width: "145px",
                                                height: "65px",
                                                top: "18px",
                                                left: "55px",
                                                borderTop:
                                                    "6px solid rgba(255,255,255,0.95)",
                                                borderRadius:
                                                    "50%",
                                                transform:
                                                    "rotate(-10deg)",
                                            }}
                                        />

                                        {/* Orange Accent */}

                                        <span
                                            style={{
                                                position:
                                                    "absolute",
                                                width: "125px",
                                                height: "48px",
                                                left: "90px",
                                                bottom: "40px",
                                                borderLeft:
                                                    "11px solid var(--sx-accent)",
                                                borderBottom:
                                                    "11px solid var(--sx-accent)",
                                                borderRadius:
                                                    "50%",
                                                transform:
                                                    "rotate(-20deg)",
                                            }}
                                        />

                                        {/* Sole */}

                                        <span
                                            style={{
                                                position:
                                                    "absolute",
                                                left: "-14px",
                                                right: "-14px",
                                                bottom: "-21px",
                                                height: "40px",
                                                borderRadius:
                                                    "0 0 38px 38px",
                                                background:
                                                    "linear-gradient(#ffffff, #b7b7bb)",
                                                boxShadow:
                                                    "0 14px 20px rgba(0,0,0,0.12)",
                                            }}
                                        />

                                        {/* Sole Detail */}

                                        <span
                                            style={{
                                                position:
                                                    "absolute",
                                                left: "22px",
                                                right: "22px",
                                                bottom: "-5px",
                                                height: "3px",
                                                borderRadius: "10px",
                                                background:
                                                    "rgba(17,17,17,0.10)",
                                            }}
                                        />
                                    </div>

                                    {/* Shadow */}

                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "55%",
                                            height: "40px",
                                            left: "22%",
                                            bottom: "16%",
                                            borderRadius: "50%",
                                            background:
                                                "rgba(0,0,0,0.18)",
                                            filter: "blur(20px)",
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Previous */}

                            <motion.button
                                type="button"
                                onClick={previousImage}
                                className="position-absolute d-flex align-items-center justify-content-center border-0"
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "50%",
                                    left: "24px",
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    background:
                                        "rgba(255,255,255,0.9)",
                                    color: "#111",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.15)",
                                    zIndex: 10,
                                }}
                                whileHover={{
                                    scale: 1.08,
                                    x: -2,
                                }}
                                whileTap={{
                                    scale: 0.94,
                                }}
                                aria-label="Previous zoomed image"
                            >
                                <ArrowLeft size={21} />
                            </motion.button>

                            {/* Next */}

                            <motion.button
                                type="button"
                                onClick={nextImage}
                                className="position-absolute d-flex align-items-center justify-content-center border-0"
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "50%",
                                    right: "24px",
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    background:
                                        "var(--sx-accent)",
                                    color: "#fff",
                                    boxShadow:
                                        "0 10px 30px rgba(255,90,31,0.25)",
                                    zIndex: 10,
                                }}
                                whileHover={{
                                    scale: 1.08,
                                    x: 2,
                                }}
                                whileTap={{
                                    scale: 0.94,
                                }}
                                aria-label="Next zoomed image"
                            >
                                <ArrowRight size={21} />
                            </motion.button>

                            {/* Bottom Hint */}

                            <div
                                className="position-absolute bottom-0 start-50 translate-middle-x"
                                style={{
                                    paddingBottom: "20px",
                                    zIndex: 10,
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    color: "#999",
                                }}
                            >
                                Click outside to close
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =====================================================
                PRODUCT LABEL
            ====================================================== */}

            <motion.div
                className="d-flex align-items-center justify-content-between mt-4"
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.35,
                    duration: 0.5,
                }}
            >
                <div>
                    <p
                        className="mb-1"
                        style={{
                            color: "#999",
                            fontSize: "0.67rem",
                            fontWeight: 800,
                            letterSpacing: "0.11em",
                            textTransform:
                                "uppercase",
                        }}
                    >
                        SneakX / Collection
                    </p>

                    <h2
                        className="mb-0"
                        style={{
                            color: "#111113",
                            fontSize: "1.18rem",
                            fontWeight: 800,
                            letterSpacing:
                                "-0.025em",
                        }}
                    >
                        {product.name}
                    </h2>
                </div>

                <span
                    className="px-3 py-2"
                    style={{
                        color: "#666",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        background: "#f1f1ee",
                        borderRadius: "100px",
                    }}
                >
                    {product.category}
                </span>
            </motion.div>
        </div>


    );
}

export default ProductGallery;