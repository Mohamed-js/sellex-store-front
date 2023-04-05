import Head from "next/head";
import { useRef, useState } from "react";
import Cover from "./Cover";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";
import Cart from "../Cart";
// import { Helmet } from "./Helmet";

export default function Store({
  OpenStore,
  openStore,
  store,
  products,
  aboutRef,
  contactRef,
}) {
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
        <link rel="shortcut icon" href={`${store.image}`} />
      </Head>
      {/* <Helmet store={store} /> */}
      {openStore && <Cart products={products} OpenStore={OpenStore} />}
      <Cover scrollHandler={productsScroll} store={store} />

      <div
        ref={productsRef}
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <Products products={products} />
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
