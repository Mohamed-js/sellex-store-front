import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductCard({ product }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div
        className={cn(
          "aspect-[5/6] aspect-h-1 w-full overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8 relative",
          isLoading && "bg-gray-100"
        )}
      >
        <Image
          alt={product.name}
          src={`${product.image}`}
          fill
          className={cn(
            "object-cover hover:scale-105 hover:rounded-lg duration-700 ease-in-out group-hover:opacity-75	",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 p-3">
        <h3>{product.name}</h3>
        <p>${product.selling_price}</p>
      </div>
      <p className="mt-1 text-sm italic text-gray-500 p-3 ">{product.name}</p>
      <div className="text-left p-3"></div>
      <div className="text-left p-3"></div>
    </Link>
  );
}
