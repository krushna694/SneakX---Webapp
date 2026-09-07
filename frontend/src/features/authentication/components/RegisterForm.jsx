import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    UserPlus,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

function RegisterForm() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        const name = formData.name.trim();
        const email = formData.email.trim().toLowerCase();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (name.length < 2) {
            setError("Please enter a valid full name.");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = register({
            name,
            email,
            password,
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/login", {
            state: {
                message:
                    "Registration successful. Please login to continue.",
            },
        });
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* ERROR MESSAGE */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        className="d-flex align-items-center gap-2 mb-4"
                        initial={{
                            opacity: 0,
                            y: -10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                        style={{
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border:
                                "1px solid #f0cccc",
                            background:
                                "#fff6f6",
                            color: "#b33a3a",
                            fontSize: "12px",
                            lineHeight: "1.5",
                        }}
                    >
                        <span
                            className="d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                            style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background:
                                    "#b33a3a",
                                color: "#ffffff",
                                fontSize: "11px",
                            }}
                        >
                            !
                        </span>

                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
                {/* FULL NAME */}
                <div className="mb-4">
                    <label
                        htmlFor="registerName"
                        className="form-label fw-semibold mb-2"
                        style={{
                            fontSize: "11px",
                            color: "#333333",
                        }}
                    >
                        Full Name
                    </label>

                    <div
                        className="d-flex align-items-center"
                        style={{
                            border:
                                "1px solid #e5e5e5",
                            borderRadius: "10px",
                            background:
                                "#ffffff",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "46px",
                                color: "#999999",
                            }}
                        >
                            <User size={17} />
                        </div>

                        <input
                            id="registerName"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            className="border-0 shadow-none"
                            style={{
                                height: "48px",
                                flex: 1,
                                minWidth: 0,
                                padding:
                                    "0 14px 0 0",
                                fontSize: "12px",
                                color: "#222222",
                                outline: "none",
                            }}
                        />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                    <label
                        htmlFor="registerEmail"
                        className="form-label fw-semibold mb-2"
                        style={{
                            fontSize: "11px",
                            color: "#333333",
                        }}
                    >
                        Email Address
                    </label>

                    <div
                        className="d-flex align-items-center"
                        style={{
                            border:
                                "1px solid #e5e5e5",
                            borderRadius: "10px",
                            background:
                                "#ffffff",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "46px",
                                color: "#999999",
                            }}
                        >
                            <Mail size={17} />
                        </div>

                        <input
                            id="registerEmail"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="border-0 shadow-none"
                            style={{
                                height: "48px",
                                flex: 1,
                                minWidth: 0,
                                padding:
                                    "0 14px 0 0",
                                fontSize: "12px",
                                color: "#222222",
                                outline: "none",
                            }}
                        />
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                    <label
                        htmlFor="registerPassword"
                        className="form-label fw-semibold mb-2"
                        style={{
                            fontSize: "11px",
                            color: "#333333",
                        }}
                    >
                        Password
                    </label>

                    <div
                        className="d-flex align-items-center"
                        style={{
                            border:
                                "1px solid #e5e5e5",
                            borderRadius: "10px",
                            background:
                                "#ffffff",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "46px",
                                color: "#999999",
                            }}
                        >
                            <Lock size={17} />
                        </div>

                        <input
                            id="registerPassword"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            className="border-0 shadow-none"
                            style={{
                                height: "48px",
                                flex: 1,
                                minWidth: 0,
                                padding:
                                    "0 10px 0 0",
                                fontSize: "12px",
                                color: "#222222",
                                outline: "none",
                            }}
                        />

                        <button
                            type="button"
                            className="btn border-0 d-flex align-items-center justify-content-center"
                            onClick={() =>
                                setShowPassword(
                                    (current) =>
                                        !current
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            style={{
                                width: "46px",
                                height: "48px",
                                color: "#888888",
                                background:
                                    "transparent",
                            }}
                        >
                            {showPassword ? (
                                <EyeOff size={17} />
                            ) : (
                                <Eye size={17} />
                            )}
                        </button>
                    </div>

                    <div
                        className="d-flex align-items-center gap-1 mt-2"
                        style={{
                            fontSize: "10px",
                            color: "#999999",
                        }}
                    >
                        <Check size={12} />
                        Minimum 8 characters
                    </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-4">
                    <label
                        htmlFor="registerConfirmPassword"
                        className="form-label fw-semibold mb-2"
                        style={{
                            fontSize: "11px",
                            color: "#333333",
                        }}
                    >
                        Confirm Password
                    </label>

                    <div
                        className="d-flex align-items-center"
                        style={{
                            border:
                                "1px solid #e5e5e5",
                            borderRadius: "10px",
                            background:
                                "#ffffff",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                                width: "46px",
                                color: "#999999",
                            }}
                        >
                            <Lock size={17} />
                        </div>

                        <input
                            id="registerConfirmPassword"
                            name="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={
                                formData.confirmPassword
                            }
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            className="border-0 shadow-none"
                            style={{
                                height: "48px",
                                flex: 1,
                                minWidth: 0,
                                padding:
                                    "0 10px 0 0",
                                fontSize: "12px",
                                color: "#222222",
                                outline: "none",
                            }}
                        />

                        <button
                            type="button"
                            className="btn border-0 d-flex align-items-center justify-content-center"
                            onClick={() =>
                                setShowConfirmPassword(
                                    (current) =>
                                        !current
                                )
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            style={{
                                width: "46px",
                                height: "48px",
                                color: "#888888",
                                background:
                                    "transparent",
                            }}
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={17} />
                            ) : (
                                <Eye size={17} />
                            )}
                        </button>
                    </div>
                </div>

                {/* REGISTER BUTTON */}
                <motion.button
                    type="submit"
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                    whileHover={{
                        y: -1,
                        boxShadow:
                            "0 8px 20px rgba(0,0,0,0.14)",
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    style={{
                        height: "48px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#111111",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: "600",
                    }}
                >
                    <UserPlus size={17} />

                    Create Account

                    <ArrowRight size={16} />
                </motion.button>
            </form>

            {/* DIVIDER */}
            <div
                className="d-flex align-items-center gap-3 my-4"
            >
                <div
                    className="flex-grow-1"
                    style={{
                        height: "1px",
                        background: "#eeeeee",
                    }}
                />

                <span
                    style={{
                        fontSize: "9px",
                        color: "#aaaaaa",
                        textTransform:
                            "uppercase",
                        letterSpacing:
                            "1px",
                    }}
                >
                    Already a member?
                </span>

                <div
                    className="flex-grow-1"
                    style={{
                        height: "1px",
                        background: "#eeeeee",
                    }}
                />
            </div>

            {/* LOGIN */}
            <Link
                to="/login"
                className="text-decoration-none"
            >
                <motion.div
                    className="d-flex align-items-center justify-content-center gap-2"
                    whileHover={{
                        backgroundColor:
                            "#fff8f4",
                        borderColor:
                            "#ffd5c5",
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    style={{
                        height: "46px",
                        borderRadius: "10px",
                        border:
                            "1px solid #e7e7e7",
                        color: "#333333",
                        fontSize: "11px",
                        fontWeight: "600",
                    }}
                >
                    <ArrowRight
                        size={15}
                        style={{
                            transform:
                                "rotate(180deg)",
                        }}
                    />

                    Back to Login
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default RegisterForm;