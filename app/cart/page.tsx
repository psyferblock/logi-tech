import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";

export const metadata = {
  title: "Your Cart - Logi-Tech",
};
async function cartPage() {

    const cart=await getCart()
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      {cart?.items.map((cartItem)=>(
<CartEntry cartItem={cartItem} key={cartItem.id}/>
      ))}
    </div>
  );
}

export default cartPage;
