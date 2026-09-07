import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    CheckCircle,
    Eye,
    EyeOff,
    Lock,
    LogIn,
    Mail,
    UserPlus,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] = useState("");

    const successMessage =
        location.state?.message;

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            setError(
                "Please enter your email and password."
            );
            return;
        }

        const result = login(
            normalizedEmail,
            password
        );

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/", {
            replace: true,
        });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setError("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError("");
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
            {/* SUCCESS MESSAGE */}
            <AnimatePresence>
                {successMessage && (
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
                                "1px solid #cfe8d5",
                            background:
                                "#f3fbf5",
                            color: "#287a3d",
                            fontSize: "12px",
                            lineHeight: "1.5",
                        }}
                    >
                        <CheckCircle
                            size={17}
                            strokeWidth={2}
                        />

                        <span>
                            {successMessage}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

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
                            className="d-flex align-items-center justify-content-center fw-bold"
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
                {/* EMAIL */}
                <div className="mb-4">
                    <label
                        htmlFor="loginEmail"
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
                            transition:
                                "border-color 0.2s ease",
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
                            id="loginEmail"
                            type="email"
                            value={email}
                            onChange={
                                handleEmailChange
                            }
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
                <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label
                            htmlFor="loginPassword"
                            className="form-label fw-semibold mb-0"
                            style={{
                                fontSize: "11px",
                                color: "#333333",
                            }}
                        >
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-decoration-none"
                            style={{
                                fontSize: "10px",
                                fontWeight: "600",
                                color: "#ff5a1f",
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </div>

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
                            id="loginPassword"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={
                                handlePasswordChange
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
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
                </div>

                {/* PASSWORD HELP */}
                <div className="mb-4">
                    <span
                        style={{
                            fontSize: "10px",
                            color: "#999999",
                        }}
                    >
                        Use your registered email
                        and password to continue.
                    </span>
                </div>

                {/* LOGIN BUTTON */}
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
                    <LogIn size={17} />

                    Login

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
                    New to SneakX?
                </span>

                <div
                    className="flex-grow-1"
                    style={{
                        height: "1px",
                        background: "#eeeeee",
                    }}
                />
            </div>

            {/* REGISTER */}
            <Link
                to="/register"
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
                    <UserPlus size={16} />

                    Create a SneakX Account

                    <ArrowRight size={15} />
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default LoginForm;