function ProductGallery({ product }) {
    return (
        <div>
            <div className="bg-light rounded p-5 text-center">
                <div
                    style={{
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h4 className="text-muted">
                        {product.name} Image
                    </h4>
                </div>
            </div>

            <div className="d-flex gap-2 mt-3">
                <div className="border rounded p-2">
                    Image 1
                </div>

                <div className="border rounded p-2">
                    Image 2
                </div>

                <div className="border rounded p-2">
                    Image 3
                </div>
            </div>
        </div>
    );
}

export default ProductGallery;