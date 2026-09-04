import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

    return (
        <form onSubmit={handleSubmit}>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">
                    Email
                </label>

                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Password
                </label>

                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                />
            </div>

            <button
                type="submit"
                className="btn btn-dark w-100"
            >
                Login
            </button>

            <div className="text-center mt-3">
                <Link to="/forgot-password">
                    Forgot Password?
                </Link>
            </div>

            <div className="text-center mt-2">
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </div>

        </form>
    );
}

export default LoginForm;