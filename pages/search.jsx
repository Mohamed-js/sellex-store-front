import Navbar from '../components/Navbar'
import { getProducts, getStore } from "../helpers/Helper";
import React from 'react'
const host = "http://localhost:3001";

// endpoint:
// GET: base/api/v1/search

// Parameters: 
// store => the store name
// q => the word we want to search

export default function Search({store}){
     function SearchProduct(e){
      let searchValue = e.target.value;
      console.log(searchValue)
     fetch(host + `/api/v1/search?q=${searchValue}&store=${store}`, {
        method: "GET",
        withCredentials: true,
        crossorigin: true,
        // mode: "no-cors",
      })
      .then( res => res)
       .then(data => console.log(data))   
     }
    return (
        <div>
        <Navbar store={store} SearchProduct={SearchProduct}/>
        </div>
    )
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