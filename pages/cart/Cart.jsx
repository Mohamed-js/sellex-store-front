import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Cart = () => {
  const [count, setCount] = useState(1);

  let products =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("product"))) ||
    [];
  return (
    <div className="w-full h-full bg-green ">
      <header className="p-5 flex justify-between items-center">
        <button
          aria-label="Close"
          className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
        >
          <Link href="/" className="flex justify-center items-center">
          <span className="flex justify-center items-center text-2xl ease-in-out duration-500  w-10 h-10 border hover:border-gray-300">×</span>{" "}
          <span className="ml-2 text-accent-7 text-sm ">Close</span>
          </Link>
        </button>
        <AiOutlineShoppingCart  className="text-lg"/>
      </header>
      <h1 className="p-4 text-3xl">My Cart</h1>
      {products &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <div
                
                className="m-3 flex justify-between items-center"
              >
                <div className="flex">
                  <div className="img-parent">
                    <Image
                      src={product.image}
                      width={80}
                      height={80}
                      alt="product-image"
                    />
                  </div>
                  <div className="p-3">
                    <h3>{product.name}</h3>
                    <span>Sizes: {product.sizes && product.sizes}</span>
                    <span className="mx-3">
                      Colors: {product.colors && product.colors}
                    </span>
                  </div>
                </div>
                <div>
                  <span>${product.price && product.price}</span>
                </div>
              </div>
              <div className="flex justify-center items-center mb-4">
                <button className="flex justify-center items-center ease-in-out duration-500 m-3 text-2xl  w-10 h-10 border hover:border-gray-300">
                  ×
                </button>
                
                  <input
                    className="w-full ease-in-out duration-500 p-3 outline-none hover:border-gray-300 border-solid border-2"
                    type="input"
                    max="50"
                    min="0"
                    value={count}
                    readOnly
                  />
                <button
                  className=" ease-in-out duration-500  w-10 h-12 border hover:border-gray-300"
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  +
                </button>
                <button
                  className="mr-3 ease-in-out duration-500  w-10 h-12 border hover:border-gray-300"
                  onClick={() => {
                    if (count < 1) {
                      return;
                    } else {
                      setCount(count - 1);
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      {/* <div className="w-full h-full">
      <div>
    <div>Subtotal</div>
    <div>$200</div>
    </div>
    <div>
      <div>Total</div>
      <div>$200</div>
    </div>
    <button className="">PROCEED TO CHECKOUT</button>
    </div> */}
      <div className="fixed  bg-white inset-x-0 bottom-0 flex-shrink-0 px-3 py-3 sm:px-3 w-full right-0 left-0 bg-accent-0 border-t text-sm">
        <ul className="pb-2">
          <li className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>$175.00</span>
          </li>
          <li className="flex justify-between py-1"></li>
          <li className="flex justify-between py-1"></li>
        </ul>
        <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
          <span>Total</span>
          <span>$175.00</span>
        </div>
        <div className="text-lg w-full bg-black text-white pt-4 pb-4 text-center ">
          <a data-variant="flat">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
