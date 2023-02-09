import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { getStaticProduct, getStaticProducts } from "../../helpers/Helper";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({ product }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="flex h-screen flex-col justify-between">
      <Head>
        <title>
          {product.store.name.toUpperCase()} - {product.name}
        </title>
        <link
          rel="shortcut icon"
          href={`https://res.cloudinary.com/atefcloud/image/upload/${product.store.image_blob.key}`}
        />
      </Head>
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
              src={`https://res.cloudinary.com/atefcloud/image/upload/${product.image_blob.key}`}
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
          </div>
        </div>
      </div>
    </div>
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
