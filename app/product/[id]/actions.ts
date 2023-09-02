//this is one of the conventions for next. server actions as a component in the same route so it can be used .
// note we can add multiple functions to this file .
"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// in tipper we did this on the client side through context

export async function incrementProductQuantity(productId: string) {
  // all the operations that we want to perform on the db we place in the lib folder under cart.ts file for organisation
  const cart = (await getCart()) ?? (await createCart());

  // find if article already in cart.
  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    //relation query for update 
    await prisma.cart.update({
      where :{id:cart.id},
      data:{
        items:{
          update:{
            where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
          }
        }
      }
    })
  
    // old operation foe comparison
  
    // await prisma.cartItem.update({
    //   where: { id: articleInCart.id },
    //   data: { quantity: { increment: 1 } },
    // });
  }else {

    // relational query for create
    await prisma.cart.update({
      where :{id:cart.id},
      data:{
        items:{
          create:{
              productId,
              quantity:1
            }
        }
      }
    })

    // old query 
    
    // await prisma.cartItem.create({
    //   data:{
    //     cartId:cart.id,
    //     productId,
    //     quantity:1
    //   }
    // })
  }
  //in server actions this refreshes the cach of the path you want to fetch 
//   note that this is the path we have in our file structure not hte URL ( GOOD THING TO  RECOGNISE)
  revalidatePath("/products/[id]")
}
