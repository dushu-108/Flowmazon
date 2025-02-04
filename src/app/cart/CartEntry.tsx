"use client";

import { formatPrice } from "@/src/Components/FormatPrice";
import { CartItemWithProduct } from "@/src/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { JSX, useTransition } from "react";

interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity : (productId : string, quantity : number) => Promise<void>;
}

export default function CartEntry({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) {
    const quantityOptions: JSX.Element[] = [];
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        );
    }

    const [isPending, startTransition] = useTransition();

    return (
        <div className="flex items-start gap-6 p-4 border-b">
            <div className="w-1/4">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
            </div>
            <div className="flex-1">
                <Link href={"/products/" + product.id} className="text-xl font-bold hover:underline">
                    {product.name}
                </Link>
                <div className="text-gray-600">Price: {formatPrice(product.price)}</div>
                <div className="my-3 flex items-center gap-2">
                    <span className="text-gray-600">Quantity:</span>
                    <select
                        className="select select-bordered w-full max-w-[80px]"
                        defaultValue={quantity}
                        onChange={(e) => {
                            const newQuantity = parseInt(e.currentTarget.value)
                            startTransition(async () => {
                                await setProductQuantity(product.id, newQuantity)
                            })
                        }}
                    >
                        <option value={0}>0 (Remove)</option>
                        {quantityOptions}
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    Total : {formatPrice(product.price * quantity)}
                    {isPending && <span className="loading loading-spinner loading-sm" />}
                </div>
            </div>
        </div>
    );
}
