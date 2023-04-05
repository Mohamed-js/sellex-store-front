import { useEffect, useRef } from "react";

import Welcome from "../components/Homies/Welcome";

export default function Home() {
  // const [subdomain, setStore] = useState();

  useEffect(() => {
    // if (window.location.hostname.split(".").length > 1) {
    //   setStore(window.location.hostname.split(".")[0]);
    //   return;
    // }
    // setStore("sellex-home");
  }, []);

  // if (subdomain === "sellex-home") {
  return <Welcome />;
  // } else if (subdomain) {
  //   return (
  //     <>
  //       <Navbar
  //         aboutScroll={aboutScroll}
  //         contactScroll={contactScroll}
  //         store={store}
  //       />
  //       <Store
  //         store={store}
  //         products={products}
  //         aboutRef={aboutRef}
  //         contactRef={contactRef}
  //       />
  //       <Footer />
  //     </>
  //   );
  // }
}
