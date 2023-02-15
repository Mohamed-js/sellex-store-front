import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getStaticProduct, getStaticProducts } from "../../helpers/Helper";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// function DeleteProduct(e){
//   let products = JSON.parse(localStorage.getItem("product")) || [];
//   products.filter(product => product.id !== e.id)
// }
export default function Product({ product }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  let storageProducts = typeof window !== "undefined" && JSON.parse(localStorage.getItem("product")) || [];
  let variantsValues = Object.values(product.variants);
  let colors = product.variants.colors;
  let sizes = product.variants.sizes;
  const [isLoading, setLoading] = useState(true);

  function AddToLocalStorage() {
    if (storageProducts.find((stProduct) => stProduct.id === product.id)) {
      return;
    } else {
      localStorage.setItem(
        "product",
        JSON.stringify([
          ...storageProducts,
          {
            // category: {
            //   // image: product.category.image,
            //   // name: product.category.name,
            // },
            price: product.selling_price,
            name: product.name,
            id: product.id,
            image: product.image,
            store: {
              id: product.store.id,
              image: product.store.image,
              name: product.store.name,
            },
            color: color,
            size: size,
          },
        ])
      );
    }
  }
  return (
    <>
      <Head>
        <title>
          {product.store.name.toUpperCase()} - {product.name}
        </title>
        <link rel="shortcut icon" href={`${product.store}`} />
      </Head>
      <div className="flex h-screen flex-col justify-between">
        <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mx-auto flex flex-col sm:flex-row">
            <div className="relative">
              <Image
                alt="coffee"
                className={cn(
                  "rounded-lg ",
                  isLoading
                    ? "scale-110 blur-lg grayscale"
                    : "scale-100 blur-0 grayscale-0"
                )}
                src={`${product.image}`}
                width={560}
                height={640}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>

            <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
              <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
                {product.name}
              </h1>
              <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
                ${product.selling_price}
              </h1>
              <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
                Description
              </div>

              <p className="max-w-xl">{product.name}</p>
              <div>
                {sizes && <h3 className="text-left p-3">Sizes</h3>}
                {variantsValues.map((value) => {
                  return (
                    value.type === "text" && (
                      <>
                        <div>
                          {value.values.map((size) => {
                            return (
                              <>
                                <button
                                  data-variant="flat"
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
                      </>
                    )
                  );
                })}
              </div>
              <div>
                {colors && <h3 className="text-left p-3">Colors</h3>}
                {variantsValues.map((value) => {
                  return (
                    value.type === "color" && (
                      <>
                        <div>
                          {value.values.map((color) => {
                            return (
                              <>
                                <button
                                  data-variant="flat"
                                  style={{ backgroundColor: color }}
                                  className="bg-black w-10 h-10 rounded-full ml-1"
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
                      </>
                    )
                  );
                })}
              </div>
              {/* <Link href="./cart/Cart"> */}
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
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const product = await getStaticProduct(params.id);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = await getStaticProducts();
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
