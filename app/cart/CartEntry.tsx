"use client";

import { cartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import React from "react";

interface cartEntryPropsInterface {
  cartItem: cartItemWithProduct;
}
function CartEntry({
  cartItem: { product, quantity },
}: cartEntryPropsInterface) {
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
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default CartEntry;
