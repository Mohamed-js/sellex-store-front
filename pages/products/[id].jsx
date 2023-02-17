import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { getStaticProduct, getStaticProducts } from "../../helpers/Helper";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({ product, defVariants }) {
  const [selectedVariants, setSelectedVariants] = useState(defVariants);
  let storageProducts =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("products"))) ||
    [];

  const [isLoading, setLoading] = useState(true);

  const handleVariantClick = (name, type, value) => {
    setSelectedVariants((prev) => {
      return { ...prev, [name]: { type, value } };
    });
  };

  function AddToLocalStorage() {
    const searchedProduct = storageProducts.filter(
      (stProduct) =>
        stProduct.id === product.id &&
        JSON.stringify(stProduct.variants) === JSON.stringify(selectedVariants)
    )[0];

    console.log(searchedProduct);
    if (searchedProduct) {
      const productsWithoutSelectedProduct = storageProducts.filter(
        (stProduct) =>
          stProduct.id !== product.id ||
          (stProduct.id === product.id &&
            JSON.stringify(stProduct.variants) !==
              JSON.stringify(selectedVariants))
      );
      localStorage.setItem(
        "products",
        JSON.stringify([
          ...productsWithoutSelectedProduct,
          {
            id: product.id,
            name: product.name,
            selling_price: product.selling_price,
            image: product.image,
            store_id: product.store.id,
            variants: selectedVariants,
            quantity: searchedProduct.quantity + 1,
          },
        ])
      );
    } else {
      localStorage.setItem(
        "products",
        JSON.stringify([
          ...storageProducts,
          {
            id: product.id,
            name: product.name,
            selling_price: product.selling_price,
            image: product.image,
            store_id: product.store.id,
            variants: selectedVariants,
            quantity: 1,
          },
        ])
      );
    }
  }
  return (
    <>
      <Navbar store={product.store} />
      <Head>
        <title>
          {product.store.name.toUpperCase()} - {product.name}
        </title>
        <link rel="shortcut icon" href={`${product.store.image}`} />
      </Head>
      <div className="flex flex-col justify-between">
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
              {product.description && (
                <>
                  <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
                    Description
                  </div>
                  <p className="max-w-xl">{product.description}</p>
                </>
              )}

              <div>
                {Object.entries(product.variants).map((variant) => (
                  <div className="pt-2" key={variant}>
                    <h2 className="uppercase mb-2 text-xl font-semibold mt-2">
                      {variant[0]}
                    </h2>
                    <div className="flex flex-wrap">
                      {variant[1]["type"] == "color"
                        ? variant[1]["values"].map((value) => (
                            <button
                              key={value}
                              onClick={() =>
                                handleVariantClick(
                                  variant[0],
                                  variant[1]["type"],
                                  value
                                )
                              }
                              className="w-12 h-12 rounded-full border shadow-md mr-2 transition duration-300 hover:scale-110 mb-2 text-2xl "
                              style={{
                                backgroundColor: value,
                                border:
                                  selectedVariants[variant[0]] &&
                                  selectedVariants[variant[0]].value == value
                                    ? "solid 3px #171717"
                                    : "none",
                                color: "white",
                              }}
                            >
                              {selectedVariants[variant[0]] &&
                                selectedVariants[variant[0]].value == value &&
                                "✓"}
                            </button>
                          ))
                        : variant[1]["values"].map((value) => (
                            <button
                              key={value}
                              onClick={() =>
                                handleVariantClick(
                                  variant[0],
                                  variant[1]["type"],
                                  value
                                )
                              }
                              className="border rounded shadow-md mr-2 text-center transition duration-300 hover:scale-110 min-w-fit px-5 py-2 mb-2"
                              style={{
                                color:
                                  selectedVariants[variant[0]] &&
                                  selectedVariants[variant[0]].value == value
                                    ? "white"
                                    : "black",
                                backgroundColor:
                                  selectedVariants[variant[0]] &&
                                  selectedVariants[variant[0]].value == value
                                    ? "#171717"
                                    : "transparent",
                              }}
                            >
                              {value.toUpperCase()}
                            </button>
                          ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button
                  className="w-full p-5 text-white bg-black hover:opacity-75 transition duration-700 ease-in-out hover:ease-in"
                  onClick={() => {
                    AddToLocalStorage();
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const product = await getStaticProduct(params.id);
  product.store.options = JSON.parse(product.store.options);
  const defVariants = {};
  Object.entries(product.variants).map((variant) => {
    defVariants[variant[0]] = {
      type: variant[1]["type"],
      value: variant[1]["values"][0],
    };
  });
  return {
    props: {
      product,
      defVariants,
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
