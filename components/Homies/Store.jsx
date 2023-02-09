import Head from "next/head";
import { useRef } from "react";
import Header from "./Header";
import ProductCard from "../ProductCard";
import About from "./About";
import Contact from "./Contact";

export default function Store({ store, products, aboutRef, contactRef }) {
  let productsRef = useRef();

  const productsScroll = (e) => {
    e.preventDefault();
    productsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <Head>
        <title>{store.name.toUpperCase()} - SellEx</title>
        <link
          rel="shortcut icon"
          href={`https://res.cloudinary.com/atefcloud/image/upload/${store.image_blob.key}`}
        />
      </Head>
      <Header scrollHandler={productsScroll} />

      <div
        ref={productsRef}
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              Crafted by us, for you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </div>
    </div>
  );
}
