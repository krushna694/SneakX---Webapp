import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    KeyRound,
    Mail,
} from "lucide-react";

function ForgotPasswordForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!normalizedEmail) {
            setError(
                "Please enter your email address."
            );
            return;
        }

        const savedUsers =
            localStorage.getItem("sneakx_users");

        const users = savedUsers
            ? JSON.parse(savedUsers)
            : [];

        const existingUser = users.find(
            (user) =>
                user.email === normalizedEmail
        );

        if (!existingUser) {
            setError(
                "No account was found with this email address."
            );
            return;
        }

        /*
         * Temporary frontend reset flow.
         * This will be replaced by a secure
         * backend password-reset token flow.
         */
        localStorage.setItem(
            "sneakx_reset_email",
            normalizedEmail
        );

        setSuccess(
            "Email verified. You can now reset your password."
        );

        setTimeout(() => {
            navigate("/reset-password");
        }, 800);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
            {/* BACK TO LOGIN */}
            <Link
                to="/login"
                className="text-decoration-none d-inline-flex align-items-center gap-2 mb-4"
                style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#555555",
                }}
            >
                <ArrowLeft size={15} />

                Back to Login
            </Link>

            {/* HEADER ICON */}
            <div className="text-center mb-4">
                <div
                    className="d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        background: "#fff1eb",
                        color: "#ff5a1f",
                    }}
                >
                    <KeyRound
                        size={23}
                        strokeWidth={1.9}
                    />
                </div>

                <h3
                    className="fw-bold mb-2"
                    style={{
                        fontSize: "22px",
                        color: "#111111",
                    }}
                >
                    Forgot Password?
                </h3>

                <p
                    className="mb-0"
                    style={{
                        fontSize: "11px",
                        lineHeight: "1.7",
                        color: "#888888",
                    }}
                >
                    Enter your registered email and
                    we'll help you reset your password.
                </p>
            </div>

            {/* ERROR */}
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
                            fontSize: "11px",
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

            {/* SUCCESS */}
            <AnimatePresence>
                {success && (
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
                            fontSize: "11px",
                            lineHeight: "1.5",
                        }}
                    >
                        <CheckCircle
                            size={17}
                            className="flex-shrink-0"
                        />

                        <span>{success}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className="mb-4">
                    <label
                        htmlFor="forgotEmail"
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
                            id="forgotEmail"
                            type="email"
                            value={email}
                            onChange={
                                handleEmailChange
                            }
                            placeholder="Enter your registered email"
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

                {/* CONTINUE */}
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
                    <KeyRound size={17} />

                    Continue

                    <ArrowRight size={16} />
                </motion.button>
            </form>

            {/* REGISTER */}
            <div
                className="text-center mt-4"
                style={{
                    fontSize: "11px",
                    color: "#888888",
                }}
            >
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-decoration-none fw-semibold"
                    style={{
                        color: "#ff5a1f",
                    }}
                >
                    Create Account
                </Link>
            </div>
        </motion.div>
    );
}

export default ForgotPasswordForm;