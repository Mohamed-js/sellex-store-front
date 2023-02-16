import Image from "next/image";
import { useState } from "react";

const Cart = ({ OpenStore }) => {
  const [count, setCount] = useState(1);
  let storageProducts =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("products"))) ||
    [];

  function DeleteProduct(product) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem(
      "products",
      JSON.stringify(
        products.filter(
          (p) =>
            p.id !== product.id ||
            (p.id === product.id &&
              JSON.stringify(p.variants) !== JSON.stringify(product.variants))
        )
      )
    );
  }

  return (
    <div className="h-full w-full fixed top-0 left-0 flex justify-center items-center z-50 bg-[#17171771]">
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-full box-border outline-2 outline outline-transparent outline-offset-2">
        <div className="absolute  top-0 right-0 bottom-0 left-0 ">
          <div className="overflow-auto relative overflow-x-hidden top-0 bg-white z-[5000] h-full w-full ml-auto translate-x-0 lg:w-2/4 px-4">
            <header className="sticky top-0 bg-white mb-4 flex justify-between items-center py-4">
              <button
                aria-label="Close"
                className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
              >
                <div
                  className="flex justify-center items-center"
                  onClick={() => OpenStore()}
                >
                  <span className="flex justify-center items-center text-2xl ease-in-out duration-500  w-10 h-10 border hover:border-gray-300">
                    ×
                  </span>
                  <span className="ml-2 text-accent-7 text-sm ">Close</span>
                </div>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                ></path>
              </svg>
            </header>

            {storageProducts &&
              storageProducts.map((product) => {
                return (
                  <>
                    <div key={product.id} className="pt-2">
                      <div className="flex justify-between items-start py-3">
                        <div className="flex">
                          <div className="img-parent pr-3">
                            <Image
                              src={product.image}
                              width={80}
                              height={80}
                              alt="product-image"
                            />
                          </div>
                          <div>
                            <h3>{product.name}</h3>
                            {/* <span>Sizes: {product.sizes && product.sizes}</span> */}
                            xix
                            <span className="mx-3">
                              {/* Colors: {product.colors && product.colors} */}
                              clx
                            </span>
                          </div>
                        </div>
                        <div>
                          <span>${product.selling_price * count} </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mb-4">
                        <button
                          onClick={() => DeleteProduct(product)}
                          className="flex justify-center items-center mr-2 ease-in-out duration-500 text-2xl  w-12 h-12 border hover:border-gray-300"
                        >
                          ×
                        </button>

                        <input
                          className="w-full ease-in-out duration-500 p-3 outline-none hover:border-gray-300 border h-12"
                          type="input"
                          max="50"
                          min="0"
                          value={count}
                          readOnly
                        />
                        <button
                          className=" ease-in-out duration-500  w-12 h-12 border hover:border-gray-300"
                          //   onClick={() => setCount((prev) => prev + 1)}
                        >
                          +
                        </button>
                        <button
                          className="ease-in-out duration-500  w-12 h-12 border hover:border-gray-300"
                          //   onClick={() => {
                          //     if (count < 1) {
                          //       return;
                          //     } else {
                          //       setCount(count - 1);
                          //     }
                          //   }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            <div className="sticky bottom-0 bg-white flex-shrink-0 px-3 py-3 sm:px-3 w-full right-0 left-0 bg-accent-0 border-t text-sm">
              <ul className="pb-2">
                <li className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>$???</span>
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
