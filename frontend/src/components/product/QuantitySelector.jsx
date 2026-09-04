function QuantitySelector({ quantity, onQuantityChange }) {
    const decrease = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const increase = () => {
        onQuantityChange(quantity + 1);
    };

    return (
        <div className="mt-4">
            <h6 className="fw-bold">Quantity</h6>

            <div className="d-flex align-items-center gap-2">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={decrease}
                >
                    -
                </button>

                <span className="fw-bold px-3">
                    {quantity}
                </span>

                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={increase}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantitySelector;