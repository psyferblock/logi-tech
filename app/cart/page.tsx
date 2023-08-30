import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your Cart - Logi-Tech",
};

// since the setProductQuantity is a server component we make add it to a client component through props in order not to disturb the authentication process in the future

async function cartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your Cart is empty</p>}
      <div className="flex flex-col  items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total:{formatPrice(cart?.subtotal||0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]"> Checkout</button>
      </div>
    </div>
  );
}

export default cartPage;
