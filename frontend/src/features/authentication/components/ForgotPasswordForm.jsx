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

import {
    forgotPasswordApi,
    verifyResetOtpApi,
} from "../api/authApi";

function ForgotPasswordForm() {
    const navigate = useNavigate();

    const [step, setStep] = useState("email");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    /*
     * -----------------------------------------
     * SEND OTP
     * -----------------------------------------
     */
    const handleEmailSubmit = async (event) => {
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

        setLoading(true);

        try {
            const response =
                await forgotPasswordApi(
                    normalizedEmail
                );

            /*
             * Backend intentionally returns the same
             * successful response whether the account
             * exists or not.
             */
            if (!response?.success) {
                setError(
                    response?.message ||
                    "Unable to process your request."
                );
                return;
            }

            setStep("otp");

            setSuccess(
                "If an account exists for this email, a password reset OTP has been sent."
            );
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                "Unable to process your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    /*
     * -----------------------------------------
     * VERIFY OTP
     * -----------------------------------------
     */
    const handleOtpSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const normalizedEmail =
            email.trim().toLowerCase();

        const normalizedOtp = otp.trim();

        if (!/^\d{6}$/.test(normalizedOtp)) {
            setError(
                "Please enter the 6-digit OTP."
            );
            return;
        }

        setLoading(true);

        try {
            const response =
                await verifyResetOtpApi(
                    normalizedEmail,
                    normalizedOtp
                );

            if (
                !response?.success ||
                !response?.data
            ) {
                setError(
                    response?.message ||
                    "Invalid or expired OTP."
                );
                return;
            }

            /*
             * IMPORTANT:
             *
             * This is NOT the login JWT.
             *
             * It is a short-lived token that can only
             * be used for password reset.
             */
            sessionStorage.setItem(
                "sneakx_password_reset_token",
                response.data
            );

            sessionStorage.setItem(
                "sneakx_password_reset_email",
                normalizedEmail
            );

            setSuccess(
                "OTP verified successfully."
            );

            setTimeout(() => {
                navigate("/reset-password");
            }, 600);
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                "Invalid or expired OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    /*
     * -----------------------------------------
     * INPUT HANDLERS
     * -----------------------------------------
     */
    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        setError("");
        setSuccess("");
    };

    const handleOtpChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, "")
            .slice(0, 6);

        setOtp(value);

        setError("");
        setSuccess("");
    };

    /*
     * -----------------------------------------
     * RENDER
     * -----------------------------------------
     */
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
                    {step === "email" ? (
                        <KeyRound
                            size={23}
                            strokeWidth={1.9}
                        />
                    ) : (
                        <Mail
                            size={23}
                            strokeWidth={1.9}
                        />
                    )}
                </div>

                <h3
                    className="fw-bold mb-2"
                    style={{
                        fontSize: "22px",
                        color: "#111111",
                    }}
                >
                    {step === "email"
                        ? "Forgot Password?"
                        : "Verify OTP"}
                </h3>

                <p
                    className="mb-0"
                    style={{
                        fontSize: "11px",
                        lineHeight: "1.7",
                        color: "#888888",
                    }}
                >
                    {step === "email"
                        ? "Enter your registered email and we'll send you a password reset OTP."
                        : `Enter the 6-digit OTP sent to ${email}.`}
                </p>
            </div>

            {/* ERROR / SUCCESS */}
            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        key="error"
                        initial={{
                            opacity: 0,
                            y: -8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -8,
                        }}
                        className="alert alert-danger py-2 px-3"
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        key="success"
                        initial={{
                            opacity: 0,
                            y: -8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -8,
                        }}
                        className="alert alert-success py-2 px-3 d-flex align-items-center gap-2"
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        <CheckCircle size={15} />

                        <span>{success}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EMAIL STEP */}
            {step === "email" && (
                <form
                    onSubmit={handleEmailSubmit}
                    className="mt-4"
                >
                    <div className="mb-3">
                        <label
                            htmlFor="forgotEmail"
                            className="form-label"
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                            }}
                        >
                            Email Address
                        </label>

                        <input
                            id="forgotEmail"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                        disabled={loading}
                        style={{
                            background: "#111111",
                            color: "#ffffff",
                            minHeight: "44px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        {loading
                            ? "Sending OTP..."
                            : "Send OTP"}

                        {!loading && (
                            <ArrowRight size={15} />
                        )}
                    </button>
                </form>
            )}

            {/* OTP STEP */}
            {step === "otp" && (
                <form
                    onSubmit={handleOtpSubmit}
                    className="mt-4"
                >
                    <div className="mb-3">
                        <label
                            htmlFor="resetOtp"
                            className="form-label"
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                            }}
                        >
                            6-Digit OTP
                        </label>

                        <input
                            id="resetOtp"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            className="form-control text-center"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="000000"
                            autoComplete="one-time-code"
                            disabled={loading}
                            required
                            style={{
                                letterSpacing: "7px",
                                fontSize: "20px",
                                fontWeight: "600",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                        disabled={loading}
                        style={{
                            background: "#111111",
                            color: "#ffffff",
                            minHeight: "44px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}

                        {!loading && (
                            <ArrowRight size={15} />
                        )}
                    </button>

                    <button
                        type="button"
                        className="btn btn-link w-100 mt-2"
                        disabled={loading}
                        onClick={() => {
                            setStep("email");
                            setOtp("");
                            setError("");
                            setSuccess("");
                        }}
                        style={{
                            fontSize: "11px",
                            color: "#555555",
                        }}
                    >
                        Change email
                    </button>
                </form>
            )}
        </motion.div>
    );
}

export default ForgotPasswordForm;