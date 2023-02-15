import Image from "next/image";
import Link from "next/link";

const Navbar = ({ aboutScroll, contactScroll, store, OpenStore }) => {
  return (
    <div style={{ backgroundColor: `${store.options.navbar.bg_color}` }}>
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center flex-1">
          <div  className="relative w-10 h-10 m-3 mx-4">
            <Image
              alt="Logo"
              src={
                "https://salesforce-cloud-commerce.vercel.app/_next/image?url=%2Fhero.jpg&w=1920&q=75"
              }
              fill
              className="rounded-full object-cover2"
              style={{textAlign: `${store.options.navbar.logo.position}`}}
            />
          </div>

          <ul style={{color: `${store.options.navbar.links.color}`}} className="sm:flex text-gray-700 pr-2 hidden">
            {store.options.navbar.links.home.exists && (
              <Link href="#">
                <li className="flex items-end mr-2">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>{" "}
                  {store.options.navbar.links.with_text && (
                    
                    <span className="h-5">
                      {store.options.navbar.links.home.text}
                    </span>
                  )}
                </li>
              </Link>
            )}
            {store.options.navbar.links.about.exists && (
              <a onClick={aboutScroll} className="cursor-pointer">
                <li className="flex items-end mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                  {store.options.navbar.links.with_text && (
                    <span className="h-5">
                      {store.options.navbar.links.about.text}
                    </span>
                  )}
                </li>
              </a>
            )}
            {store.options.navbar.links.contact.exists && (
              <a onClick={contactScroll} className="cursor-pointer">
                <li className="flex items-end mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  {store.options.navbar.links.with_text && (
                    <span className="h-5">
                      {store.options.navbar.links.contact.text}
                    </span>
                  )}
                </li>
              </a>
            )}
          </ul>
        </div>

        <div className="flex-1 relative text-gray-700 hidden lg:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border p-2 pl-3 focus:outline-gray-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 absolute top-2 right-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {/* Cart & Menu */}
        <div
          className="flex flex-1 justify-end mr-3 text-gray-700"
          style={{ color: store.options.navbar.cart.color }}
        >
          
          <div className="mr-1 cursor-pointer" onClick= {() => OpenStore()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        
          <div className="sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 relative text-gray-700 lg:hidden mx-4 mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full border p-2 pl-3 focus:outline-gray-300"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute top-2 right-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
