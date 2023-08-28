import { Product } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ProductCardPropsInterface{
    product:Product
}
function ProductCard({product}:ProductCardPropsInterface) {
  return (
    <div>
      <Link href={"/products/"+product.id}
      className='cardn w-full bg-base-100 hover:shadow-xl transition-shadow'
      >      
      <div className="card-body ">
        <h2 className='card-title'>
          {product.name}
        </h2>
        <p>{product.description}</p>
        </div>
        </Link>
    </div>
  )
}

export default ProductCard