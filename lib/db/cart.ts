import { Cart, CartItem, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type cartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type cartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
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
  const session = await getServerSession(authOptions);

  let cart: cartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    // storing cart in cookie method
    const localCartId = cookies().get("localCartId")?.value;

    cart = localCartId
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
  }
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
export async function createCart(): Promise<ShoppingCartType> {
  const session = await getServerSession(authOptions); //Note: good to know that the cookies and getServerSession will always dynamically load meaning the page will not be cached since every user has his own data to be transfered.

  let newCart: Cart;
  // if there is a session it creates a cart connected to this user
  // if no user it creates cart anonymously
  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
  }
  // needs encryption and secure settings in production
  cookies().set("localCartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
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

// THIS FUNCTION ALLOWS THE ANONYMOUS CART TO BE TRANSFERED UNDER THE USER ID WHEN THE USER SIGNS IN.
// so technically we have to transfer the cookie from anonymous to the user
// and insert the user id from the login to the cart
export async function mergeAnonymousCartIntoUserCart(userId: string) {
  // fetch local cart
  const localCartId = cookies().get("localCartId")?.value;

  // fetch local cart from DB
  // remember this is a ternary operator where we check if there is a localCartId and if it doesnt exist localCart will return null.
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        // the reason we didnt include the products because we wont need it for the merge. all we want is the product id.
        include: {
          items: true,
        },
      })
    : null;

  // if there is no local cart then we return normally for hte next step is to call the user cart
  if (!localCart) return;

  // we call the user cart if there is any from the database.
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  // at this moment we have both carts the local and the user and will have to make several db operations to merge them.
  // for this we have to create a DB transaction in order to make sure that any changes on the ui will not effect our data

  // execute transaction in prisma
  // in the $transaction function we pass an arrow function to execute the logic needed for hte transaciton
  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);
      // next step is deleting the items in carts and using the mergedCartItems instead
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });
      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id, // we use the userCartId to replace the cartID htat existed so we maintain that cart.
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
      //the else is for if the user didnt have a cart so we create one
    } else {
      await tx.cart.create({
        data: {
          userId: userId,
          items: {
            // this is a prisma relationship query.
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: { id: localCart.id },
    });

    cookies().set("localCartId","")
  });

  // merging
}

// function that contains the logic to merge the items

// the ...cartitems destructures all the cart items we have
// we give it the type cartItem[][] the first array because its an array of items and the second array means it could be multiple arrays in an array
function mergeCartItems(...cartItems: CartItem[][]) {
  // take each entry and combine them together adding quantity and add items from anonymous cart into user cart
  // the reduce funciton takes 2 parameters which is the function and initial state. the function takes what ever is fed into it ( here its cart items) and splits them into the afunction that does stuff to the items and hte items themselves extracted ultimately to retun something completed. in our case its the newe cartItem object which has the cart items as an array with the wuantity of each items.
  return cartItems.reduce((accumulator, items) => {
    items.forEach((item) => {
      const existingItem = accumulator.find(
        (i) => i.productId === item.productId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        accumulator.push(item);
      }
    });
    return accumulator;
  }, [] as CartItem[]); // note the [] as CartItem here explains the initial state of the empty array that has type cartItemwhich is an object of {productid,cartId,quantity,id}
}
