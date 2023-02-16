import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Store from "../components/Homies/Store";
import Welcome from "../components/Homies/Welcome";
import Navbar from "../components/Navbar";
import { getProducts, getStore } from "../helpers/Helper";

export default function Home({ store, products }) {
  const [subdomain, setStore] = useState();
  const [openStore, setOpenStore] = useState(false);
  function OpenStore() {
    setOpenStore((prev) => !prev);
    if (!openStore) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "relative";
    }
  }

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
  } else if (subdomain) {
    return (
      <>
        <Navbar
          aboutScroll={aboutScroll}
          contactScroll={contactScroll}
          store={store}
          OpenStore={OpenStore}
        />
        <Store
          openStore={openStore}
          store={store}
          products={products}
          aboutRef={aboutRef}
          contactRef={contactRef}
          OpenStore={OpenStore}
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
  store.options = JSON.parse(store.options);
  return { props: { products: data, store: store } };
}
