import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-6 col-lg-5">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Login to SneakX
                            </h2>

                            <LoginForm />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;