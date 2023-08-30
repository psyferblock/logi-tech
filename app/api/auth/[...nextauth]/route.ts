import { prisma } from "@/lib/db/prisma"
import { PrismaAdapter } from "@/auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

export const authOptions:NextAuthOptions={
    adapter:PrismaAdapter(prisma) as Adapter,
    providers:[
        GoogleProvider({
            
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
        
    ]
}
const handler =NextAuth(authOptions)

export {handler as GET,handler as POST}

// since google requires actual values and it cant tell if the env variables are there or not we normally add the exclamation mark "!" which asserts that the env variables are there 
// but what if we forgot ? what if there is an error ?
// that is why we installed zod 