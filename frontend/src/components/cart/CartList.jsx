import CartItem from "./CartItem";

function CartList({ items }) {
    return (
        <div>
            {items.map((item) => (
                <CartItem
                    key={item.cartItemId}
                    item={item}
                />
            ))}
        </div>
    );
}

export default CartList;