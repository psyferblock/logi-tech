

interface ProductPagePropsInterface {
    params: {
      id: string;
    };
  }
import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
  import React from 'react'
  
  async function ProductPage(
    {params:{id}}:ProductPagePropsInterface
  ) {

    const product= await prisma.product.findUnique({where:{id}})
    // this redirects us to the not found page 
    if(!product) notFound()

    return (
      <div>pages</div>
    )
  }
  
  export default ProductPage