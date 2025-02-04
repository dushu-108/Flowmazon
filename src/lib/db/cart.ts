import { cookies } from "next/headers";
import prisma from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";


export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true };
}>;

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
    items: CartItemWithProduct[]; 
    size: number; 
    subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const session = await getServerSession(authOptions);
    
    let cart : CartWithProducts | null = null;
    
    if(session){
        cart = await prisma.cart.findFirst({
            where : {userId : session.user.id},
            include : { items : { include : {product : true} } }
        })
    } else {
        const localCartId = (await cookies()).get("localCartId")?.value;
        cart = localCartId
        ?await prisma.cart.findUnique({
            where : {id : localCartId},
            include : { items : { include : {product : true} } }
        })
        : null;
    }

    if(!cart){
        return null;
    }

    return{
        ...cart,
        size : cart.items.reduce((acc, items) => acc + items.quantity, 0),
        subtotal : cart.items.reduce(
            (acc, items) => acc + items.quantity * items.product.price,
            0
        )
    }
}

export async function createCart(): Promise<ShoppingCart>{
    const session = await getServerSession(authOptions);

    let newCart : Cart;

    if(session){
        newCart = await prisma.cart.create({
            data : {userId : session.user.id}
        })
    } else {
        newCart = await prisma.cart.create({
            data : {},
        })
    }

    ;(await cookies()).set("localCartId", newCart.id);

    return{
        ...newCart,
        items : [],
        size : 0,
        subtotal : 0,
    }   
}