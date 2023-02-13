import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductCard({ product }) {
  let a = Object.entries(product.variants)
  let b = Object.keys(product.variants)
  let colors = product.variants.colors;
  let sizes = product.variants.sizes;
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  console.log(size);
  const [isLoading, setLoading] = useState(true);
  let storageProducts = JSON.parse(localStorage.getItem("product")) || [];

  function AddToLocalStorage() {
    if (storageProducts.find((stProduct) => stProduct.id === product.id)) {
      return;
    } else {
      localStorage.setItem(
        "product",
        JSON.stringify([
          ...storageProducts,
          {
            category: {
              image: product.category.image,
              name: product.category.name,
            },
            name: product.name,
            id: product.id,
            image: product.image,
            store: {
              id: product.store.id,
              image: product.store.image,
              name: product.store.name,
            },
            colors: color,
            sizes: size,
          },
        ])
      );
    }
  }

  return (
    <>
    <div className="group">
        <div
          className={cn(
            "aspect-[5/6] aspect-h-1 w-full overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8 relative",
            isLoading && "bg-gray-100"
          )}
        >
            <Link href={`/products/${product.id}`} >
          <Image
            alt={product.name}
            src={`${product.image}`}
            fill
            className={cn(
              "object-contain duration-700 ease-in-out group-hover:opacity-75	",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 p-3">
          <h3>{product.name}</h3>
          <p>${product.selling_price}</p>
        </div>
        <p className="mt-1 text-sm italic text-gray-500 p-3 ">{product.name}</p>
        <div className="text-left p-3">
          {sizes && <h3>Sizes</h3>}
          {sizes &&
            sizes.values.map((size) => {
              return (
                <>
                  <button
              
                    data-variant="flat"
                    style={{ backgroundColor: size }}
                    className="w-10 h-10 rounded-full border border-black-600 ml-1.5"
                    role="option"
                    aria-selected="false"
                    aria-label="color black"
                    title="black"
                    onClick={() => setSize(size)}
                  >
                    {size}
                  </button>
                </>
              );
            })}
        </div>
        <div className="text-left p-3">
          {colors && <h3>Colors</h3>}
          {colors &&
            colors.values.map((color) => {
              return (
                <>
                  <button
                    data-variant="flat"
                    style={{ backgroundColor: color }}
                    className="bg-black w-10 h-10 rounded-full"
                    role="option"
                    aria-selected="false"
                    aria-label="color black"
                    title="black"
                    onClick={() => setColor(color)}
                  ></button>
                </>
              );
            })}
        </div>
            <Link href="./cart/Cart">
        <div className="text-center">
          <button
            className="w-full p-5 text-white bg-black hover:opacity-75 transition duration-700 ease-in-out hover:ease-in"
            onClick={() => {
              AddToLocalStorage();
            }}
          >
            Add To Cart
          </button>
        </div>
        </Link>
      </div>
      {/* {
        b.map( e => {
          return (
            <>
            <div>{e}
            {a.map(e =>  {
              
              e.type === 'color' ? console.log("color"): console.log("text")
            })}
            </div>
          
            </>
            )
        })
      } */}
    </>
  );
}
