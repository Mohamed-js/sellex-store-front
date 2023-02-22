import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";

const Cart = ({
  closeCart,
  setCartClosed,
  setSidebarOpened,
  openCart,
  store,
  showDialog,
}) => {
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [storageProducts, setStorageProducts] = useState();
  useEffect(() => {
    setStorageProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

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
                  onClick={() => closeCart()}
                >
                  <span className="flex justify-center items-center text-2xl ease-in-out duration-500  w-10 h-10 border hover:border-gray-300">
                    ×
                  </span>
                  <span className="ml-2 text-accent-7 text-sm ">CLOSE</span>
                </div>
              </button>
              <div className="flex">
                <svg
                  onClick={() => {
                    setCartClosed(true), setSidebarOpened(false);
                  }}
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
                <div className="sm:hidden">
                  <svg
                    onClick={() => openCart()}
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
                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                  </svg>
                </div>
              </div>
            </header>

            {!checkoutOpened && (
              <>
                {storageProducts &&
                  storageProducts.length > 0 &&
                  storageProducts.map((product, i) => {
                    return (
                      <CartCard
                        index={i}
                        product={product}
                        key={product.id + JSON.stringify(product.variants)}
                        storageProducts={storageProducts}
                        setStorageProducts={setStorageProducts}
                      />
                    );
                  })}

                {storageProducts && storageProducts.length > 0 && (
                  <div className="sticky bottom-0 bg-white flex-shrink-0 px-3 py-3 sm:px-3 w-full right-0 left-0 bg-accent-0 border-t text-sm">
                    <ul className="pb-2">
                      <li className="flex justify-between py-1">
                        <span>Subtotal</span>
                        <span>
                          $
                          {storageProducts.reduce(
                            (accumulator, product) =>
                              accumulator +
                              product.quantity * product.selling_price,
                            0
                          )}
                        </span>
                      </li>
                      <li className="flex justify-between py-1">
                        <span>Shipping</span>
                        <span className="font-semibold">FREE</span>
                      </li>
                      <li className="flex justify-between py-1"></li>
                    </ul>
                    <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
                      <span className="text-lg">Total</span>
                      <span>
                        $
                        {storageProducts.reduce(
                          (accumulator, product) =>
                            accumulator +
                            product.quantity * product.selling_price,
                          0
                        )}
                      </span>
                    </div>
                    <div>
                      <button
                        className="text-lg w-full bg-black text-white pt-4 pb-4 text-center "
                        onClick={() => setCheckoutOpened(true)}
                        data-variant="flat"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutOpened && (
              <Checkout
                storageProducts={storageProducts}
                store={store}
                closeCart={closeCart}
                showDialog={showDialog}
              />
            )}

            {storageProducts && storageProducts.length === 0 && (
              <div className="h-96 flex items-center justify-center uppercase flex-col">
                <h2 className="text-lg">Cart is empty...</h2>
                <Link href="/" onClick={() => closeCart()}>
                  <button className="rounded-md border border-transparent outline outline-orange-600 px-4 py-3 text-base font-medium shadow-sm hover:bg-orange-600 text-orange-600 hover:text-white sm:px-8 mt-5 transition duration-500 ">
                    Shop Now
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export const CartCard = ({
  product,
  index,
  storageProducts,
  setStorageProducts,
}) => {
  function DeleteProduct() {
    const prods = storageProducts;
    prods.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(prods));
    setStorageProducts(JSON.parse(localStorage.getItem("products")));
  }

  const increaseProduct = () => {
    const prods = storageProducts;
    prods[index].quantity++;
    localStorage.setItem("products", JSON.stringify(prods));

    setStorageProducts(JSON.parse(localStorage.getItem("products")));
  };

  const decreaseProduct = () => {
    const prods = storageProducts;
    prods[index].quantity--;
    localStorage.setItem("products", JSON.stringify(prods));

    setStorageProducts(JSON.parse(localStorage.getItem("products")));
  };
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
                alt={product.name}
              />
            </div>
            <div>
              <h3 className="text-normal font-bold sm:text-2xl">
                {product.name}
              </h3>
              <div className="flex flex-row text-sm sm:text-lg ">
                {Object.entries(product.variants).map((variant) => (
                  <div key={variant[0]}>
                    {variant[1].type == "color" ? (
                      <span className="capitalize flex flex-row items-center">
                        {variant[0]}:{" "}
                        <div
                          className="rounded-full border border-black mr-2 ml-1"
                          style={{
                            width: "1.6rem",
                            height: "1.6rem",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: variant[1].value,
                            }}
                            key={variant[1].value}
                            className="w-6 h-6 rounded-full border shadow-md transition duration-300 inline-block border-white"
                          ></div>
                        </div>
                      </span>
                    ) : (
                      <span className="mx-1 capitalize flex flex-row items-center">
                        {variant[0]}:{" "}
                        <div className="border rounded shadow-md text-center transition duration-300 px-1 inline-block text-sm ml-1 font-bold">
                          {variant[1].value.toUpperCase()}
                        </div>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <span>${product.selling_price * product.quantity}</span>
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
            type="number"
            value={product.quantity}
            readOnly
          />

          <button
            className="ease-in-out duration-500 w-12 h-12 border hover:border-gray-300 text-xl"
            style={{
              cursor: product.quantity <= 1 ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              if (product.quantity <= 1) {
                return;
              } else {
                decreaseProduct();
              }
            }}
          >
            -
          </button>
          <button
            className=" ease-in-out duration-500 w-12 h-12 border hover:border-gray-300 text-xl"
            style={{
              cursor: product.quantity >= 20 ? "not-allowed" : "pointer",
            }}
            onClick={() => increaseProduct()}
          >
            +
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};
