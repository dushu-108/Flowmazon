import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCart } from "@/src/lib/db/cart";
import ShoppingCartButton from "./ShoppinCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth/authOptions";


async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-200 w-full">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.png"
              height={40}
              width={40}
              alt="flowmazon logo"
              className="mr-2"
            />
            <span className="text-xl font-bold whitespace-nowrap">Flowmazon</span>
          </Link>
        </div>

        {/* Search and Buttons */}
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <form action={searchProducts} className="flex-grow">
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full sm:w-auto"
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
