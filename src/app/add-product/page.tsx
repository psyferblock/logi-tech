import { prisma } from "@/src/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Add Product Logi-Tech",
};

// add product function
async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  console.log("formData", formData.keys());
  console.log('formData.values(', formData.values())

  if (!name || !description || !imageUrl || !price) {
    throw Error("missing required credentials");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/");

}
function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold ">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <button className="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  );
}

export default AddProductPage;
