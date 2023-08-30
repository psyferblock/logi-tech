"use client";

import { cartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface cartEntryPropsInterface {
  cartItem: cartItemWithProduct;
}
function CartEntry({
  cartItem: { product, quantity },
}: cartEntryPropsInterface) {

  // why JSX.ELEMENT? because we want to put an option tags which are HTML elements and we can put htem in a JSX  array but were going to do them in a loop
  const quantityOptions:JSX.Element[] =[]
  for(let i=1;i<99;i++){
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
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
            <select className="select-bordered select w-full max-w-[80px]">{quantityOptions}</select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default CartEntry;
