import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Lock,
    Eye,
    EyeOff,
    KeyRound,
    ArrowRight,
    ArrowLeft,
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

        // Remove the temporary reset session
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

    return (
        <motion.div
            className="container py-5"
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.4,
            }}
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">

                            {/* Back */}
                            <div className="mb-4">
                                <Link
                                    to="/login"
                                    className="text-decoration-none text-dark d-inline-flex align-items-center gap-2"
                                >
                                    <ArrowLeft size={17} />
                                    Back to Login
                                </Link>
                            </div>

                            {/* Header */}
                            <div className="text-center mb-4">

                                <div className="mb-3">
                                    <KeyRound
                                        size={36}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <h2 className="fw-bold mb-2">
                                    Reset Password
                                </h2>

                                <p className="text-muted mb-0">
                                    Create a new password for
                                    your account.
                                </p>

                            </div>

                            {/* Reset Email */}
                            {resetEmail && (
                                <div className="alert alert-light border text-center mb-4">
                                    Resetting password for
                                    <br />
                                    <strong>
                                        {resetEmail}
                                    </strong>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <motion.div
                                    className="alert alert-danger"
                                    initial={{
                                        opacity: 0,
                                        y: -10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Success */}
                            {success && (
                                <motion.div
                                    className="alert alert-success"
                                    initial={{
                                        opacity: 0,
                                        y: -10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                >
                                    {success}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* New Password */}
                                <div className="mb-3">

                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        New Password
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            <Lock size={18} />
                                        </span>

                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(
                                                    event.target.value
                                                );
                                                setError("");
                                            }}
                                            placeholder="Enter new password"
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
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
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>

                                    </div>

                                    <div className="form-text">
                                        Password must contain at
                                        least 8 characters.
                                    </div>

                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Confirm New Password
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            <Lock size={18} />
                                        </span>

                                        <input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(event) => {
                                                setConfirmPassword(
                                                    event.target.value
                                                );
                                                setError("");
                                            }}
                                            placeholder="Confirm new password"
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
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
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                    whileHover={{
                                        scale: 1.01,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                >
                                    <KeyRound size={18} />
                                    Reset Password
                                    <ArrowRight size={18} />
                                </motion.button>

                            </form>

                            {/* Login */}
                            <div className="text-center mt-4">
                                <span className="text-muted">
                                    Remember your password?{" "}
                                </span>

                                <Link
                                    to="/login"
                                    className="fw-semibold text-dark"
                                >
                                    Login
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default ResetPasswordForm;