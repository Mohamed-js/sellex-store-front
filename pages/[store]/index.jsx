import { useRef } from "react";
import Footer from "../../components/Footer";
import Store from "../../components/Homies/Store";
import Navbar from "../../components/Navbar";
import { getProducts, getStaticStores, getStore } from "../../helpers/Helper";

export default function StorePage({ store, products }) {
  let aboutRef = useRef();
  let contactRef = useRef();
  const aboutScroll = (e) => {
    e.preventDefault();
    aboutRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const contactScroll = (e) => {
    e.preventDefault();
    console.log(contactRef);
    contactRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  console.log(store);
  return (
    <>
      <Navbar
        aboutScroll={aboutScroll}
        contactScroll={contactScroll}
        store={store}
      />
      <Store
        store={store}
        products={products}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const store = await getStore(params.store);
  store.options = JSON.parse(store.options);

  const products = await getProducts(params.store);
  return {
    props: { products: products, store: store },
  };
}

export async function getStaticPaths() {
  const stores = await getStaticStores();
  const paths = stores.map((store) => ({
    params: { store: `${store.name.toLowerCase()}` },
  }));

  return {
    paths,
    fallback: false,
  };
}
