"use server";

import { revalidatePath } from "next/cache";
import { createCart, getCart } from "../../lib/db/cart";
import { prisma } from "@/lib/db/prisma";

// this function is to set a property and to revalidate path.

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart?.items.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (articleInCart) {

      // relation query for delete 
        await prisma.cart.update({
          where:{
            id:cart.id
          },
          data:{
            items:{
              delete:{id:articleInCart.id}
            }
          }
        })
      // normal query for delete 

      // await prisma.cartItem.delete({
      //   where: {
      //     id: articleInCart.id,
      //   },
      // });
    }
  } else {
    if (articleInCart) {

      // relation query for upadate
      await prisma.cart.update({
        where:{id:cart.id},
        data:{
          items:{
            update:{
              where:{id:articleInCart.id},
              data:{
                quantity
              }
            }
          }
        }
      })

      // normal query for update

      // await prisma.cartItem.update({
      //   where: { id: articleInCart.id },
      //   data: { quantity },
      // });
    } else {
      
      //relation query for create
      await prisma.cart.update({
        where:{id:cart.id},
        data:{
          items:{
            create:{
              productId,
              quantity,
            }
          }
        }
      })

      // normal query for create 

      // await prisma.cartItem.create({
      //   data: {
      //     cartId: cart.id,
      //     productId,
      //     quantity,
      //   },
      // });
    }
  }
  revalidatePath("/cart");
}
