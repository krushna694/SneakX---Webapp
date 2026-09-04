const sizes = [6, 7, 8, 9, 10, 11];

function SizeSelector({ selectedSize, onSizeChange }) {
    return (
        <div className="mt-4">
            <h6 className="fw-bold">Select Size</h6>

            <div className="d-flex flex-wrap gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        type="button"
                        className={`btn ${selectedSize === size
                                ? "btn-dark"
                                : "btn-outline-dark"
                            }`}
                        onClick={() => onSizeChange(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {selectedSize && (
                <p className="text-muted mt-2 mb-0">
                    Selected size: {selectedSize}
                </p>
            )}
        </div>
    );
}

export default SizeSelector;