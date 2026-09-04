import ProductGrid from "../../components/product/ProductGrid";

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

function Products() {
    return (
        <div className="container py-5">

            <div className="mb-5">
                <h1 className="fw-bold">All Sneakers</h1>

                <p className="text-muted">
                    Explore our collection of sneakers.
                </p>
            </div>

            <ProductGrid products={products} />

        </div>
    );
}

export default Products;