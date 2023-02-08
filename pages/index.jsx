import { useEffect, useState } from "react";
import Store from "../components/Homies/Store";
import Welcome from "../components/Homies/Welcome";
import { getProducts } from "../helpers/Helper";

export default function Home({ products }) {
  const [store, setStore] = useState();
  useEffect(() => {
    if (window.location.hostname.split(".").length > 1) {
      setStore(window.location.hostname.split(".")[0]);
      return;
    }
    setStore("sellex-home");
  }, []);
  if (store === "sellex-home") {
    return <Welcome />;
  }
  if (store) {
    return <Store store={store} products={products} />;
  }
}

export async function getServerSideProps(context) {
  const store = context.req.headers.host.split(".")[0];
  const products = await getProducts(store);

  if (!products) {
    return {
      notFound: true,
    };
  }
  return { props: { products } };
}
