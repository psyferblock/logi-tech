import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";


export async function getCart(){
    // const getCart=await prisma.cart.findUnique({
    //     id:id
    // })
    const localCartId=cookies().get('localCartId')?.value
    const cart =localCartId? 
    await prisma.cart.findUnique({
        where :{id:localCartId}
    })

}
export async function createCart(){
    const newCart = await prisma.cart.create({
        data:{}
    })

    // needs encryption and secure settings in production   
    cookies().set("localCartId",newCart.id)
}