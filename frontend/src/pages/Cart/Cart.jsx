import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import CartEmpty from "../../components/cart/CartEmpty";

function Cart() {
    const {
        cartItems,
        cartTotal,
        clearCart,
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <>
                <div className="container py-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fw-bold mb-0">
                            Shopping Cart
                        </h1>

                        <Link
                            to="/products"
                            className="btn btn-outline-dark"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                    <CartEmpty />
                </div>
            </>
        );
    }

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold mb-0">
                    Shopping Cart
                </h1>

                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            </div>

            <div className="row g-4">

                {/* Cart Items */}
                <div className="col-lg-8">
                    <CartList items={cartItems} />
                </div>

                {/* Cart Summary */}
                <div className="col-lg-4">
                    <CartSummary subtotal={cartTotal} />
                </div>

            </div>

        </div>
    );
}

export default Cart;