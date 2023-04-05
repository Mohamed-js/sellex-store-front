import Navbar from "../components/Navbar";
import { getStore, searchProduct } from "../helpers/Helper";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Search({ store }) {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = async (value) => {
    setSearchValue(value);
    setProducts(value.length > 0 && (await searchProduct(value, store.name)));
    if (value.length === 0) {
      setProducts([]);
    }
  };

  return (
    <div>
      <Navbar store={store} handleSearch={handleSearch} inSearch />
      {searchValue.length > 0 && products.length > 0 ? (
        <h3 className="ml-4 p-3">
          Showing {products.length} result{products.length > 1 && "s"} for
          &apos;&apos;
          <span className="font-bold">{searchValue}</span>&apos;&apos;
        </h3>
      ) : searchValue.length > 0 && products.length === 0 ? (
        <h3 className="p-3 ml-4">
          There are no products that match &apos;&apos;
          <span className="font-bold">{searchValue}</span>&apos;&apos;
        </h3>
      ) : (
        ""
      )}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => {
              return (
                <>
                  <Link
                    href={`/products/${product.id}`}
                    className="group"
                    key={product.id}
                  >
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
                          "object-contain duration-700 ease-in-out group-hover:opacity-75	",
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
                    <p className="mt-1 text-sm italic text-gray-500 p-3 ">
                      {product.name}
                    </p>
                    <div className="text-left p-3"></div>
                    <div className="text-left p-3"></div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (context.req.headers.host.split(".").length <= 1) {
    return { props: {} };
  }
  const subdomain = context.req.headers.host.split(".")[0];
  const store = await getStore(subdomain);

  if (!store || store.message === "not found") {
    return {
      notFound: true,
    };
  }

  store.options = JSON.parse(store.options);
  return { props: { store: store } };
}
