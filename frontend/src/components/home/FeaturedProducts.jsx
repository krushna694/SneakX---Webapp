import ProductCard from "../product/ProductCard";

const products = [
    {
        id: 1,
        name: "Air Runner",
        price: 4999,
    },
    {
        id: 2,
        name: "Street Force",
        price: 5999,
    },
    {
        id: 3,
        name: "Urban Classic",
        price: 4499,
    },
    {
        id: 4,
        name: "Sport Max",
        price: 6999,
    },
];

function FeaturedProducts() {
    return (
        <section className="py-5 bg-light">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">
                            Featured Sneakers
                        </h2>

                        <p className="text-muted mb-0">
                            Our popular picks.
                        </p>
                    </div>

                    <button className="btn btn-dark">
                        View All
                    </button>
                </div>

                <div className="row g-4">
                    {products.map((product) => (
                        <div
                            className="col-6 col-md-3"
                            key={product.id}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default FeaturedProducts;