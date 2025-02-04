import ProductCard from "@/src/Components/ProductCard";
import prisma from "@/src/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: Promise<{ query: string }>;  // Wraps the searchParams object in a Promise
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  // Resolve the searchParams promise to get the query
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query;

  return {
    title: `Search: ${query} - Flowmazon`,
  };
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  // Resolve the searchParams promise to get the query
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query;

  // Fetch products from the database based on the query
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  // If no products are found, display a message
  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  // Display the list of products
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
