import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "@/lib/db/actions";

export const metadata = {
  title: "Your Cart - Logi-Tech",
};



// since the setProductQuantity is a server component we make add it to a client component through props in order not to disturb the authentication process in the future 

async function cartPage() {

    const cart=await getCart()
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      {cart?.items.map((cartItem)=>(
<CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
      ))}
    </div>
  );
}

export default cartPage;
