"use server";

import { revalidatePath } from "next/cache";
import { createCart, getCart } from "./cart";
import { prisma } from "./prisma";

// this function is to set a property and to revalidate path.

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) && (await createCart());

  const articleInCart = cart?.items.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: {
          id: articleInCart.id,
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart?.id,
          productId,
          quantity,
        },
      });
    }
  }
  revalidatePath("/cart");
}
