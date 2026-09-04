import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Mail,
    ArrowRight,
    KeyRound,
    CheckCircle,
    ArrowLeft,
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

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setError("Please enter your email address.");
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
         * In the backend version this will be replaced
         * with a real password-reset token sent by email.
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

    return (
        <motion.div
            className="container py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">

                            {/* Back to Login */}
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
                                    Forgot Password?
                                </h2>

                                <p className="text-muted mb-0">
                                    Enter your registered email
                                    to reset your password.
                                </p>

                            </div>

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
                                    className="alert alert-success d-flex align-items-center gap-2"
                                    initial={{
                                        opacity: 0,
                                        y: -10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                >
                                    <CheckCircle size={18} />
                                    {success}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* Email */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email Address
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Mail size={18} />
                                        </span>

                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(
                                                    event.target.value
                                                );
                                                setError("");
                                            }}
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                        />
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
                                    Continue
                                    <ArrowRight size={18} />
                                </motion.button>

                            </form>

                            {/* Register */}
                            <div className="text-center mt-4">
                                <span className="text-muted">
                                    Don't have an account?{" "}
                                </span>

                                <Link
                                    to="/register"
                                    className="fw-semibold text-dark"
                                >
                                    Register
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default ForgotPasswordForm;