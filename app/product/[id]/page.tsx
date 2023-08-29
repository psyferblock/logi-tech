import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { cache } from "react";

interface ProductPagePropsInterface {
  params: {
    id: string;
  };
}

// the below function caches the information that we want

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  // this redirects us to the not found page
  if (!product) notFound();
  return product;
});

// the generateMetadata  function ( this is how its supposed to be written) will give us dynamic metadata and fetch the data from the database seperately from the page function
// the metadata we have because we want it to be dynamic is writteen in a function in order to be able to fetch the data based on the id dynamically
// iot makes sense since we cant share data from the page function to another function no????

export async function generateMetadata({
  params: { id },
}: ProductPagePropsInterface): Promise<Metadata> {
  // if we use the fetch function for to get data from the api then the data is cached and deduplicated where ever needed on the file. which means calling the data twice will very much be calling the data to cache and then sending it to the places it needs to be
  const product = await getProduct(id);

  return {
    title: product.name + " - logi-tech",
    description: product.description,
    // to over ride the open graph image
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

async function ProductPage({ params: { id } }: ProductPagePropsInterface) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        // priority attribute will give the image priority over other images. so its first to load and stuff

        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
