import { motion } from "framer-motion";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function ForgotPassword() {
    return (
        <div
            className="container"
            style={{
                paddingTop: "38px",
                paddingBottom: "50px",
            }}
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <motion.div
                        className="card position-relative overflow-hidden"
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            borderRadius: "6px",
                            border: "1px solid #dddddd",
                            background: "#ffffff",
                            boxShadow:
                                "0 5px 18px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        {/* SneakX Accent */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "3px",
                                background: "#ff5a1f",
                            }}
                        />

                        <div className="card-body p-4 p-md-5">
                            <ForgotPasswordForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;