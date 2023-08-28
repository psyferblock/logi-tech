import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products =await prisma.product.findMany({
    orderBy:{id:"desc"},

  })
  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">

      <Image 
      src={products[0].imageUrl}
      alt={products[0].name}
      width={400}
      height={800}
      className="w-full max-w-sm rounded-lg shadow-2xl"
      priority
      />
      <h1 className="text-5xl font-bold ">{products[0].name}</h1>
      <h1 className="py-6">{products[0].description}</h1>
      <Link href={'/products/'+products[0].id} 
      className="btn-primary btn"
      >check it out </Link>
      </div>
      </div>
    </div>
  );
}
