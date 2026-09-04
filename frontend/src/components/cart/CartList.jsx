import CartItem from "./CartItem";

function CartList({ items }) {
    return (
        <div>
            {items.map((item) => (
                <CartItem
                    key={`${item.product.id}-${item.size}`}
                    item={item}
                />
            ))}
        </div>
    );
}

export default CartList;