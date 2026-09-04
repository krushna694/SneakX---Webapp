function CartSummary({ subtotal }) {
    const shipping = subtotal > 0 ? 100 : 0;
    const total = subtotal + shipping;

    return (
        <div className="card shadow-sm">
            <div className="card-body">

                <h4 className="fw-bold mb-4">
                    Cart Summary
                </h4>

                <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal</span>

                    <span className="fw-bold">
                        ₹{subtotal}
                    </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <span>Shipping</span>

                    <span className="fw-bold">
                        ₹{shipping}
                    </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">
                        Total
                    </span>

                    <span className="fw-bold">
                        ₹{total}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn btn-dark w-100"
                >
                    Proceed to Checkout
                </button>

            </div>
        </div>
    );
}

export default CartSummary;