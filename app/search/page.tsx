import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import React from "react";

interface SearchPagePropsI {
  searchParams: { query: string };
}

export function generateMetadata({
    searchParams: { query },
  }: SearchPagePropsI): Metadata {
    return {
      title: `Search: ${query} - Pierce-Tech`,
    };
  }
async function page({ searchParams: { query } }: SearchPagePropsI) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query} }
    
    ]
    },
    orderBy:{id:"desc"}
  });
  if (products.length===0){
    return <div className="text-center">No Products</div>
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map(product=>(
            <ProductCard product={product} key={product.id}/>
        ))}
    </div>
  )
  
}

export default page;
