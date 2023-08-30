import { Cart, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";

export type cartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;
// creating a type for hte object shopping cart
export type ShoppingCartType = cartWithProducts & {
  size: number;
  subtotal: number;
};
export async function getCart(): Promise<ShoppingCartType | null> {
  // const getCart=await prisma.cart.findUnique({
  //     id:id
  // })
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        }, // looking at the models in the schema we are finding the cart id to include the items which are the id of the products we need. so since the end result is the products we end up diving deeper into the relationship we have with the models and getting exactly what we want .
      })
    : null;
  if (!cart) {
    return null;
  }
  return {
    // if there is a cart we want to return additional meta information.
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0), // reduce takes 2 parameters remember. the original state and the function that manages the state. here the function is adding the accumulated items together.
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}
export async function createCart():Promise<ShoppingCartType> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // needs encryption and secure settings in production
  cookies().set("localCartId", newCart.id);
  return{
    ...newCart,
    items:[],
    size:0,
    subtotal:0
  }
}

//