"use client";

import { formatPrice } from "@/src/Components/FormatPrice";
import { ShoppingCart } from "@/src/lib/db/cart";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-30 mt-3 w-60 bg-base-100 shadow-lg border border-gray-200 rounded-lg"
      >
        <div className="card-body p-4">
          <div className="mb-3">
            <span className="text-lg font-bold text-gray-800">
              {cart?.size || 0} {cart?.size === 1 ? "Item" : "Items"}
            </span>
            <span className="block text-sm text-gray-500 mt-1">
              Subtotal:{" "}
              <span className="font-semibold text-gray-800">
                {formatPrice(cart?.subtotal || 0)}
              </span>
            </span>
          </div>
          <div className="divider my-2"></div>
          <div className="flex flex-col gap-2">
            <Link
              href="/cart"
              className="btn bg-blue-700 w-full text-white hover:bg-blue-800"
              onClick={closeDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
