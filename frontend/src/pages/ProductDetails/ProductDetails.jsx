import { useParams } from "react-router-dom";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";

const products = [
    {
        id: 1,
        name: "Air Runner",
        price: 4999,
        category: "Running",
        description:
            "Comfortable running sneakers designed for everyday performance.",
    },
    {
        id: 2,
        name: "Street Force",
        price: 5999,
        category: "Lifestyle",
        description:
            "A stylish sneaker designed for everyday streetwear.",
    },
    {
        id: 3,
        name: "Urban Classic",
        price: 4499,
        category: "Lifestyle",
        description:
            "A classic design that fits perfectly into your everyday wardrobe.",
    },
    {
        id: 4,
        name: "Sport Max",
        price: 6999,
        category: "Sports",
        description:
            "Performance-focused sneakers built for active lifestyles.",
    },
    {
        id: 5,
        name: "Velocity X",
        price: 5499,
        category: "Running",
        description:
            "Lightweight sneakers designed for speed and everyday comfort.",
    },
    {
        id: 6,
        name: "Street Runner",
        price: 4799,
        category: "Lifestyle",
        description:
            "Modern streetwear sneakers with a comfortable everyday design.",
    },
    {
        id: 7,
        name: "Air Motion",
        price: 6299,
        category: "Sports",
        description:
            "Performance sneakers designed for an active lifestyle.",
    },
    {
        id: 8,
        name: "Classic Low",
        price: 3999,
        category: "Lifestyle",
        description:
            "A clean and simple sneaker for everyday wear.",
    },
];

function ProductDetails() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h2>Product Not Found</h2>

                <p className="text-muted">
                    The product you are looking for does not exist.
                </p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row g-5">

                <div className="col-lg-6">
                    <ProductGallery product={product} />
                </div>

                <div className="col-lg-6">
                    <ProductInfo product={product} />
                </div>

            </div>
        </div>
    );
}

export default ProductDetails;