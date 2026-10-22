
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { adminLoginApi } from "../api/authApi";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        setError("");

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await adminLoginApi(
                normalizedEmail,
                password
            );

            const authData = response?.data;
            const roles = Array.isArray(authData?.roles)
                ? authData.roles
                : [];

            // Never store a token for an unexpected role.
            if (
                !response?.success ||
                !authData?.token ||
                !roles.includes("ADMIN")
            ) {
                setError("Unable to sign in with these credentials.");
                return;
            }

            const adminUser = {
                id: authData.userId,
                firstName: authData.firstName,
                lastName: authData.lastName,
                name: [
                    authData.firstName,
                    authData.lastName,
                ].filter(Boolean).join(" "),
                email: authData.email,
                roles,
                role: "ADMIN",
            };

            localStorage.setItem("sneakx_token", authData.token);
            localStorage.setItem(
                "sneakx_user",
                JSON.stringify(adminUser)
            );
            localStorage.removeItem("sneakx_isAuthenticated");

            window.dispatchEvent(
                new CustomEvent("sneakx_auth_changed", {
                    detail: { action: "login" },
                })
            );

            navigate("/admin/dashboard", { replace: true });
        } catch (requestError) {
            setError(
                requestError.response?.status === 401 ||
                    requestError.response?.status === 403
                    ? "Unable to sign in with these credentials."
                    : requestError.response?.data?.message ||
                    "Sign-in failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{ background: "#f5f5f5" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="card w-100"
                style={{
                    maxWidth: "430px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.07)",
                }}
            >
                <div style={{ height: "4px", background: "#ff5a1f" }} />

                <div className="card-body p-4 p-md-5">
                    <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{
                            width: "58px",
                            height: "58px",
                            borderRadius: "14px",
                            background: "#111111",
                            color: "#ffffff",
                        }}
                    >
                        <ShieldCheck size={28} />
                    </div>

                    <p
                        className="text-center mb-2"
                        style={{
                            color: "#ff5a1f",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "2px",
                        }}
                    >
                        SNEAKX CONTROL CENTER
                    </p>

                    <h1
                        className="text-center fw-bold mb-2"
                        style={{ fontSize: "25px", color: "#111111" }}
                    >
                        Administrator Sign In
                    </h1>

                    <p
                        className="text-center mb-4"
                        style={{ fontSize: "12px", color: "#777777" }}
                    >
                        Authorized administrators only.
                    </p>

                    {error && (
                        <div
                            role="alert"
                            className="mb-3"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #f0cccc",
                                background: "#fff6f6",
                                color: "#a32d2d",
                                fontSize: "12px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="adminEmail"
                                className="form-label fw-semibold"
                                style={{ fontSize: "12px" }}
                            >
                                Administrator email
                            </label>

                            <input
                                id="adminEmail"
                                type="email"
                                className="form-control"
                                autoComplete="username"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setError("");
                                }}
                                disabled={isLoading}
                                required
                                maxLength={255}
                                style={{
                                    minHeight: "46px",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="adminPassword"
                                className="form-label fw-semibold"
                                style={{ fontSize: "12px" }}
                            >
                                Password
                            </label>

                            <div className="input-group">
                                <span
                                    className="input-group-text"
                                    style={{ background: "#ffffff" }}
                                >
                                    <LockKeyhole size={16} />
                                </span>

                                <input
                                    id="adminPassword"
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setError("");
                                    }}
                                    disabled={isLoading}
                                    required
                                    minLength={8}
                                    maxLength={100}
                                    style={{
                                        minHeight: "46px",
                                        fontSize: "13px",
                                    }}
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setShowPassword((current) => !current)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    disabled={isLoading}
                                >
                                    {showPassword
                                        ? <EyeOff size={16} />
                                        : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                            disabled={isLoading}
                            style={{
                                minHeight: "47px",
                                borderRadius: "8px",
                                background: "#111111",
                                color: "#ffffff",
                                fontSize: "13px",
                                fontWeight: 600,
                                opacity: isLoading ? 0.7 : 1,
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        aria-hidden="true"
                                    />
                                    Verifying access...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={17} />
                                    Secure sign in
                                </>
                            )}
                        </button>
                    </form>

                    <div
                        className="text-center mt-4 pt-3"
                        style={{
                            borderTop: "1px solid #eeeeee",
                            color: "#888888",
                            fontSize: "10px",
                        }}
                    >
                        Restricted administrative access
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default AdminLogin;
