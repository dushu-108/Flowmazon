import prisma from "@/src/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/src/Components/PriceTag";
import AddToCartButton from "./AddToCartButton";
import incrementProductQuantity from "./actions";

interface ProductPageProps {
  params: Promise<{ id: string }>;  // Wraps the params object in a Promise
}

export default async function ProductPage({ params }: ProductPageProps) { 
  // Resolve the params promise
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch the product using the resolved id
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 bg-base-200 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          priority
          className="rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <PriceTag price={product.price} className="mb-4" />
          <p className="text-gray-700 mb-4">{product.description}</p>
          <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
        </div>
      </div>
    </div>
  );
}

