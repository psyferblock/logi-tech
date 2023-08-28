import { formatPrice } from '@/lib/format'
import React from 'react'

interface PriceTagPropsInterface {
    price:number,
    className?:string
}
function PriceTag({price,className}:PriceTagPropsInterface) {

  return (  
    <div>
        <span className={`badge ${className}`}>{formatPrice(price)}</span>
    </div>
  )
}

export default PriceTag