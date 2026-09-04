import ProductCard from "../product/ProductCard";

const products = [
    {
        id: 5,
        name: "Velocity X",
        price: 5499,
    },
    {
        id: 6,
        name: "Street Runner",
        price: 4799,
    },
    {
        id: 7,
        name: "Air Motion",
        price: 6299,
    },
    {
        id: 8,
        name: "Classic Low",
        price: 3999,
    },
];

function NewArrivals() {
    return (
        <section className="py-5">
            <div className="container">

                <div className="text-center mb-4">
                    <h2 className="fw-bold">
                        New Arrivals
                    </h2>

                    <p className="text-muted">
                        Fresh sneakers just for you.
                    </p>
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

export default NewArrivals;