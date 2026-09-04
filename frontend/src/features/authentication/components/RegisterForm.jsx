import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    UserPlus,
    ArrowRight,
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

    const [showPassword, setShowPassword] = useState(false);
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

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (name.length < 2) {
            setError("Please enter a valid full name.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
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
            className="container py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">

                            {/* Header */}
                            <div className="text-center mb-4">
                                <div className="mb-3">
                                    <UserPlus
                                        size={34}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <h2 className="fw-bold mb-2">
                                    Create Account
                                </h2>

                                <p className="text-muted mb-0">
                                    Create your SneakX account
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

                            <form onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Full Name
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <User size={18} />
                                        </span>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Mail size={18} />
                                        </span>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Lock size={18} />
                                        </span>

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
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
                                        Password must contain at least
                                        8 characters.
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Confirm Password
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Lock size={18} />
                                        </span>

                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            value={
                                                formData.confirmPassword
                                            }
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
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

                                {/* Register Button */}
                                <motion.button
                                    type="submit"
                                    className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <UserPlus size={18} />
                                    Create Account
                                    <ArrowRight size={18} />
                                </motion.button>

                            </form>

                            {/* Login */}
                            <div className="text-center mt-4">
                                <span className="text-muted">
                                    Already have an account?{" "}
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

export default RegisterForm;