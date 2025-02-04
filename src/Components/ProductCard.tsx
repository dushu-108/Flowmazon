import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <Link
        href={"/products/" + product.id}
        className="card w-full bg-base-100 hover:shadow-xl transition"
      >
        <figure className="relative h-48 sm:h-64 md:h-72 lg:h-80">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-lg sm:text-xl md:text-2xl">
            {product.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {product.description}
          </p>
          <PriceTag price={product.price} />
        </div>
      </Link>
    </div>
  );
}
