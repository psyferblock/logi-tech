import FormSubmitbutton from "@/components/FormSubmitbutton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { type } from "os";
import React from "react";
import FinishButtonComponent from "./FinishButtonComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product Logi-Tech",
};


// add product function
async function addProduct(formData: FormData) {
  "use server";

  const session=await getServerSession(authOptions)
  if (!session){
    // the question mark indicates wehre we want to  direct after signin. then we add = to send it to wehre we want after the callbackUrl is set.
    redirect("api/auth/signin?callbackUrl=/add-product")
  }
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  console.log("formData", formData.keys());
  console.log("formData.values(", formData.values());

  if (!name || !description || !imageUrl || !price) {
    throw Error("missing required credentials");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/add-product");
  
}
async function AddProductPage() {
  const session = await getServerSession(authOptions)
  if (!session){
    // the question mark indicates wehre we want to  direct after signin. then we add = to send it to wehre we want after the callbackUrl is set.
    redirect("api/auth/signin?callbackUrl=/add-product")
  }
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
        <FormSubmitbutton className={" btn-block "} type={"submit"}>
          AddProduct
        </FormSubmitbutton>
        {/* <FinishButtonComponent/> */}
      </form>
    </div>
  );
}

export default AddProductPage;
