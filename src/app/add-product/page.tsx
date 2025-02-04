import prisma from "@/src/lib/db/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth/authOptions";

export const metadata = {
    title : "Add Product - Flowmazon"
}

async function addProduct(formData : FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    
    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }
    
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing required  field");
    }

    await prisma.product.create({
        data : {name, description, imageUrl, price},
    });
    
    redirect("/");
}

export default async function AddProduct() {
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-lg md:text-xl mb-4 font-bold text-center">Add Product</h1>
            <form action={addProduct} className="space-y-4">
                <input 
                    required 
                    name="name" 
                    placeholder="Name" 
                    type="text" 
                    className="w-full shadow-lg input input-bordered"
                />
                <textarea 
                 required
                 name="description"
                 placeholder="Description" 
                 className="textarea-bordered textarea w-full"
                 ></textarea>

                <input 
                    required 
                    name="imageUrl" 
                    placeholder="Image URL" 
                    type="url" 
                    className="w-full shadow-lg input input-bordered"
                />
                <input 
                    required 
                    name="price" 
                    placeholder="Price" 
                    type="number" 
                    className="w-full shadow-lg input input-bordered"
                />
                <button 
                    type="submit" 
                    className="btn bg-blue-700 text-white hover:bg-blue-800 btn-block"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
