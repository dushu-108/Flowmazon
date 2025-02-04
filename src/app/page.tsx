import prisma from "../lib/db/prisma";
import ProductCard from "../Components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import PaginationBar from "../Components/PaginationBar";
import { PageProps } from "@/.next/types/app/page";

export interface HomeProps extends PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const page = (await searchParams)?.page || "1";
  const currentPage = parseInt(page, 10);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center min-h-screen">
      {currentPage === 1 && (
        <div className="hero rounded-lg bg-base-200 p-6">
          <div className="hero-content flex-col lg:flex-row lg:items-center lg:gap-8">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={800}
              height={400}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 
                     (max-width: 1024px) 50vw, 
                     33vw"
            />
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold">{products[0].name}</h1>
              <p className="text-lg text-black">{products[0].description}</p>
              <Link
                href={`/products/${products[0].id}`}
                className="btn bg-blue-700 w-32 hover:bg-blue-800 text-white"
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(currentPage === 1 ? 1 : 0).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}




