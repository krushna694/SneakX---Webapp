import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Save,
    ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/authentication/hooks/useAuth";

function Account() {
    const { user, updateUser } = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleProfileUpdate = (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!name.trim() || !email.trim()) {
            setError("Name and email are required.");
            return;
        }

        const result = updateUser({
            name: name.trim(),
            email: email.trim(),
        });

        if (result.success) {
            setMessage(result.message);
        }
    };

    const handlePasswordChange = (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all password fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setMessage(
            "Password updated successfully. Backend validation will be added later."
        );
    };

    return (
        <div className="container py-5">

            {/* Header */}
            <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Link
                    to="/profile"
                    className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 mb-3"
                >
                    <ArrowLeft size={18} />
                    Back to Profile
                </Link>

                <h1>Account Settings</h1>

                <p className="text-muted">
                    Manage your personal information and password.
                </p>
            </motion.div>


            {/* Messages */}
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            <div className="row g-4">

                {/* Personal Information */}
                <div className="col-12 col-lg-6">

                    <motion.div
                        className="card shadow-sm h-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <User size={24} />
                                <h4 className="mb-0">
                                    Personal Information
                                </h4>
                            </div>

                            <form onSubmit={handleProfileUpdate}>

                                {/* Name */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Name
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            <User size={18} />
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                            placeholder="Enter your name"
                                        />

                                    </div>

                                </div>


                                {/* Email */}
                                <div className="mb-4">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            <Mail size={18} />
                                        </span>

                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            placeholder="Enter your email"
                                        />

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-dark d-flex align-items-center gap-2"
                                >
                                    <Save size={18} />
                                    Update Information
                                </button>

                            </form>

                        </div>
                    </motion.div>

                </div>


                {/* Change Password */}
                <div className="col-12 col-lg-6">

                    <motion.div
                        className="card shadow-sm h-100"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <Lock size={24} />

                                <h4 className="mb-0">
                                    Change Password
                                </h4>
                            </div>

                            <form onSubmit={handlePasswordChange}>

                                {/* Current Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={currentPassword}
                                        onChange={(event) =>
                                            setCurrentPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter current password"
                                    />

                                </div>


                                {/* New Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(event) =>
                                            setNewPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter new password"
                                    />

                                </div>


                                {/* Confirm Password */}
                                <div className="mb-4">

                                    <label className="form-label">
                                        Confirm New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Confirm new password"
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-dark d-flex align-items-center gap-2"
                                >
                                    <Lock size={18} />
                                    Change Password
                                </button>

                            </form>

                        </div>
                    </motion.div>

                </div>

            </div>

        </div>
    );
}

export default Account;