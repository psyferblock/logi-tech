import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searcQuery")?.toString();
  if (searchQuery) {
    // were redirecting to a search page with a query ontop. to get us all the data we need regarding our search. this seems simple enough for hte preliminary search maybe this allows us to engage with teh db from the server side in a much smoother way.
    redirect("/search?query=" + searchQuery);
  }
}

//
export default async function Navbar() {
  // auth options are the ones we set up for next-auth
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row h-20">
          {/* flex-1 attributes define how the items dtretch over the available space on the nav bar  */}
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl normal-case h-auto">
            <Image
              className="rounded-lg "
              src={logo}
              alt="Pierce-Tech logo"
              height="60"
              width="120"
            />
            Pierce-Tech
          </Link>
        </div>
        <div className="flex-none gap-2">
          {/* the form is used for hte search bar  */}
          <form action="searchProducts">
            <div className="form-control">
              <input
                type="text"
                placeholder="search"
                name="searchQuery"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}

// in form action we can just add the url of the query page that we created but that will cause the page to reload which isnt the best user experience the way we did it happens more subtely and allows for a smooth transition maintaining all the things saved on state and our activities as of far.
