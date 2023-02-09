import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Store from "../components/Homies/Store";
import Welcome from "../components/Homies/Welcome";
import Navbar from "../components/Navbar";
import { getProducts, getStore } from "../helpers/Helper";

export default function Home({ store, products }) {
  const [subdomain, setStore] = useState();
  useEffect(() => {
    if (window.location.hostname.split(".").length > 1) {
      setStore(window.location.hostname.split(".")[0]);
      return;
    }
    setStore("sellex-home");
  }, []);

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

  if (subdomain === "sellex-home") {
    return <Welcome />;
  } else if (store) {
    return (
      <>
        <Navbar aboutScroll={aboutScroll} contactScroll={contactScroll} />
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
}

export async function getServerSideProps(context) {
  if (context.req.headers.host.split(".").length <= 1) {
    return { props: {} };
  }
  const subdomain = context.req.headers.host.split(".")[0];
  const data = await getProducts(subdomain);

  if (!data || data.message === "not found") {
    return {
      notFound: true,
    };
  }
  const store = await getStore(subdomain);
  return { props: { products: data, store: store } };
}
