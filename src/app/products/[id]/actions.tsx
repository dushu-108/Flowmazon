"use server"
import { createCart, getCart } from "@/src/lib/db/cart"
import prisma from "@/src/lib/db/prisma";
import { revalidatePath } from "next/cache";

export default async function incrementProductQuantity(productId : string) {
    const cart = (await getCart()) ?? (await createCart());
    const articleInCart = cart.items.find(item => item.productId === productId);
    if(articleInCart){
        await prisma.cartItem.update({
            where : {id : articleInCart.id},
            data : {quantity : {increment : 1}}
        })
    } else {
        await prisma.cartItem.create({
            data : {
                cartId : cart.id,
                productId,
                quantity : 1
            }
        });
    }

    revalidatePath("/products/[id]");
}