import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardPropsInterface {
  product: Product;
}
function ProductCard({ product }: ProductCardPropsInterface) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <div>
      <Link
        href={"/products/" + product.id}
        className="cardn w-full bg-base-100 hover:shadow-xl transition-shadow"
      >
        {/* // figure is from the daisy ui docs  */}
        <figure>
          {/* object-cover crops the image  */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={400}
            className="h-48 object-cover"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{product.name}</h2>
          {isNew && <div className="badge badge-secondary"> NEW</div>}

          <p>{product.description}</p>
          <PriceTag price={product.price} />
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
