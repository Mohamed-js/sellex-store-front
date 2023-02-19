import Navbar from "../components/Navbar";
import { getProducts, getStore, searchProduct } from "../helpers/Helper";
import React from "react";

export default function Search({ store }) {
  const handleSearch = async (e) => {
    const products = await searchProduct(e.target.value, store.name);
    console.log(products);
  };
  return (
    <div>
      <Navbar store={store} handleSearch={handleSearch} />
    </div>
  );
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
