const categories = [
    "Running",
    "Lifestyle",
    "Basketball",
    "Sports",
];

function CategorySection() {
    return (
        <section className="py-5">
            <div className="container">

                <div className="text-center mb-4">
                    <h2 className="fw-bold">Shop By Category</h2>
                    <p className="text-muted">
                        Find sneakers that match your style.
                    </p>
                </div>

                <div className="row g-4">
                    {categories.map((category) => (
                        <div className="col-6 col-md-3" key={category}>
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body py-5">
                                    <h5 className="fw-bold">{category}</h5>

                                    <button className="btn btn-outline-dark mt-3">
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default CategorySection;