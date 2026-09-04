import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const successMessage = location.state?.message;

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        const result = login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/");
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
        <form onSubmit={handleSubmit}>

            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success d-flex align-items-center gap-2">
                    <CheckCircle size={18} />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Email */}
            <div className="mb-3">
                <label
                    htmlFor="loginEmail"
                    className="form-label"
                >
                    Email
                </label>

                <input
                    id="loginEmail"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                />
            </div>

            {/* Password */}
            <div className="mb-3">
                <label
                    htmlFor="loginPassword"
                    className="form-label"
                >
                    Password
                </label>

                <input
                    id="loginPassword"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                />
            </div>

            {/* Login Button */}
            <button
                type="submit"
                className="btn btn-dark w-100"
            >
                Login
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-3">
                <Link
                    to="/forgot-password"
                    className="fw-semibold text-dark text-decoration-none"
                >
                    Forgot Password?
                </Link>
            </div>

            {/* Register */}
            <div className="text-center mt-2">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="fw-semibold text-dark text-decoration-none"
                >
                    Register
                </Link>
            </div>

        </form>
    );
}

export default LoginForm;