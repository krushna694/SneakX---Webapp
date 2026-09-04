function HeroSection() {
    return (
        <section className="bg-dark text-white py-5">
            <div className="container py-5">
                <div className="row align-items-center">

                    <div className="col-lg-6">
                        <p className="text-uppercase fw-bold mb-2">
                            Step Into Style
                        </p>

                        <h1 className="display-3 fw-bold">
                            Find Your Perfect Pair
                        </h1>

                        <p className="lead mt-3">
                            Discover the latest sneakers at SneakX.
                        </p>

                        <button className="btn btn-light btn-lg mt-3">
                            Shop Now
                        </button>
                    </div>

                    <div className="col-lg-6 text-center mt-4 mt-lg-0">
                        <div className="bg-secondary rounded p-5">
                            <h3>Sneaker Collection</h3>
                            <p className="mb-0">
                                New styles coming soon
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroSection;