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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET CART FUNCTION 
export async function getCart(): Promise<ShoppingCartType | null> {
    // a simple way to do it but we wanted to store the cart in a cookie so we dont haver to keep requesting the data from server. 
  // const getCart=await prisma.cart.findUnique({
  //     id:id
  // }) 

  // storing cart in cookie method 
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE CART FUNCTION 
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

//logic of prisma and functionality creation in this file 
// connecting the models in prisma we start with the id ( since its the cart id here ) from there we dive into the items and then the products hte items represent.
// with that we understand what we will be getting.
// after that we create the return of the cart which in this case the price and total number of items in the cart for that we use a reducer to perform the calculations
// a reducer function takes 2 parameters an initial state and a function which takes the state and applies the functionality on it. 
// reducer ((end state,initial state)=>{ here we write the functionality },0) /// above we wanted to add the items to calculate how many and their price to calculate how much. check the code please.

// logic  of typescript.
// the cart returns an object with information. so we have to create a type for hte object. 
// prisma supports us with the models we created so it creates some types for us to utilise. 
// the first type is extracted from Prisma itself where we add the return object itself and prisma makes the type for us . 
//the second type "ShoppingCartType" adds to the previous type the object values we added.