import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle,
    Eye,
    EyeOff,
    KeyRound,
    Lock,
} from "lucide-react";

function ResetPasswordForm() {
    const navigate = useNavigate();

    const resetEmail = localStorage.getItem(
        "sneakx_reset_email"
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!resetEmail) {
            setError(
                "Password reset session has expired. Please try again."
            );
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please fill in all fields.");
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

        const savedUsers =
            localStorage.getItem("sneakx_users");

        const users = savedUsers
            ? JSON.parse(savedUsers)
            : [];

        const userIndex = users.findIndex(
            (user) => user.email === resetEmail
        );

        if (userIndex === -1) {
            setError(
                "User account could not be found."
            );
            return;
        }

        const updatedUsers = [...users];

        updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            password,
        };

        localStorage.setItem(
            "sneakx_users",
            JSON.stringify(updatedUsers)
        );

        localStorage.removeItem(
            "sneakx_reset_email"
        );

        setSuccess(
            "Your password has been reset successfully."
        );

        setTimeout(() => {
            navigate("/login", {
                state: {
                    message:
                        "Password reset successfully. Please login with your new password.",
                },
            });
        }, 1000);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError("");
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
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

            {/* HEADER */}
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
                    Reset Password
                </h3>

                <p
                    className="mb-0"
                    style={{
                        fontSize: "11px",
                        lineHeight: "1.7",
                        color: "#888888",
                    }}
                >
                    Create a new password for your
                    account.
                </p>
            </div>

            {/* RESET EMAIL */}
            {resetEmail && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mb-4 text-center"
                    style={{
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border:
                            "1px solid #eeeeee",
                        background: "#fafafa",
                        color: "#777777",
                        fontSize: "10px",
                        lineHeight: "1.6",
                    }}
                >
                    Resetting password for
                    <br />

                    <strong
                        style={{
                            color: "#333333",
                            fontSize: "11px",
                        }}
                    >
                        {resetEmail}
                    </strong>
                </motion.div>
            )}

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
                {/* NEW PASSWORD */}
                <div className="mb-4">
                    <label
                        htmlFor="resetPassword"
                        className="form-label fw-semibold mb-2"
                        style={{
                            fontSize: "11px",
                            color: "#333333",
                        }}
                    >
                        New Password
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
                            id="resetPassword"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={
                                handlePasswordChange
                            }
                            placeholder="Enter new password"
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
                        htmlFor="resetConfirmPassword"
                        className="form-label fw-semibold mb-2"
                        style={{
                            fontSize: "11px",
                            color: "#333333",
                        }}
                    >
                        Confirm New Password
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
                            id="resetConfirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={
                                confirmPassword
                            }
                            onChange={
                                handleConfirmPasswordChange
                            }
                            placeholder="Confirm new password"
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

                {/* RESET BUTTON */}
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

                    Reset Password

                    <ArrowRight size={16} />
                </motion.button>
            </form>

            {/* LOGIN */}
            <div
                className="text-center mt-4"
                style={{
                    fontSize: "11px",
                    color: "#888888",
                }}
            >
                Remember your password?{" "}

                <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                    style={{
                        color: "#ff5a1f",
                    }}
                >
                    Login
                </Link>
            </div>
        </motion.div>
    );
}

export default ResetPasswordForm;