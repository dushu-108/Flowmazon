import { getCart } from "@/src/lib/db/cart";
import CartEntry from "./CartEntry";
import setProductQuantity from "./actions";
import { formatPrice } from "@/src/Components/FormatPrice";

export const metadata = {
    title : "Your Cart - Flowmazon",
};

export default async function CartPage() {
    const cart = await getCart();

    return(
        <div>
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p>Your cart is empty</p>}
            <div className="flex flex-col items-center sm:items-start">
                <p className="mb-3 font-bold">
                    Total : {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn w-28 bg-blue-700 text-white hover:bg-blue-800">Check Out</button>
            </div>
        </div>
    )
}