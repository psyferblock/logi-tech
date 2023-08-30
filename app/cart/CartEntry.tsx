"use client";

import { cartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React, {  useTransition } from "react";

interface cartEntryPropsInterface {
  cartItem: cartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: cartEntryPropsInterface) {

  const [isPending,startTransition]=useTransition()

  // why JSX.ELEMENT? because we want to put an option tags which are HTML elements and we can put htem in a JSX  array but were going to do them in a loop
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i < 99; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />

        <div>
          <Link href={"products/" + product.id} className="font-bold">
            {product.name}
          </Link>

          <div> Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select-bordered select w-full max-w-[80px] "
              defaultValue={quantity}
              // js is required for on change components which means we can only use it in a client component BUT WE CAN still call server actions in client components.
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async()=> {
                  await setProductQuantity(product.id,newQuantity)
                })
              }}
            >
              <option value={0} >0 Remove</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
          </div>
          {isPending&& (<span className="loading loading-spinner loading-sm"/>)}
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default CartEntry;
