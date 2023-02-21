import Link from "next/link";
export default function Sidebar({
  home,
  contactScroll,
  aboutScroll,
  store,
  openSidebar,
  closeSidebar,
  setSidebarOpened,
  setStoreOpened,
}) {
  function sidebarWidth() {
    window.innerWidth > 640 && setSidebarOpened(false);
  }
  window.addEventListener("resize", sidebarWidth);
  return (
    <div className="h-full w-full fixed top-0 left-0 flex justify-center items-center z-50 bg-[#17171771] sm:hidden">
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-full box-border outline-2 outline outline-transparent outline-offset-2">
        <div className="absolute  top-0 right-0 bottom-0 left-0 ">
          <div className="overflow-auto relative overflow-x-hidden top-0 bg-white z-[5000] h-full w-2/4 ml-auto translate-x-0  sm:hidden max-[540px]:w-full">
            <header className="sticky top-0 bg-white mb-4 flex justify-between items-center py-4 px-4">
              <button
                aria-label="Close"
                className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
              >
                <div
                  className="flex justify-center items-center"
                  onClick={() => closeSidebar()}
                >
                  <span className="flex justify-center items-center text-2xl ease-in-out duration-500  w-10 h-10 border hover:border-gray-300">
                    ×
                  </span>
                  <span className="ml-2 text-accent-7 text-sm ">CLOSE</span>
                </div>
              </button>
              <div className="flex">
                <svg
                  onClick={() => {
                    openSidebar();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
                <div className="sm:hidden overflow-hidden outline-none">
                  <svg
                    onClick={() => {
                      setSidebarOpened(true), setStoreOpened(false);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                  </svg>
                </div>
              </div>
            </header>
            <ul
              style={{ color: `${store.options.navbar.links.color}` }}
              className=" flex flex-col  w-full items-center px-6 text-gray-700 pr-2 sm:hidden "
            >
              {store.options.navbar.links.home.exists && (
                <Link
                  href={home ? "#" : "/"}
                  onClick={() => setSidebarOpened(false)}
                  className="flex  hover:underline text-blue-600
                  hover:text-green-800 
                  visited:text-green-700"
                >
                  <li className="flex items-end mr-2 mb-5 ">
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
                <Link
                  href={home ? "" : "/#about"}
                  onClick={(e) => {
                    aboutScroll(e), setSidebarOpened(false);
                  }}
                  className="cursor-pointer underline hover:no-underline
                  text-blue-600 hover:text-blue-800 
                  visited:text-red-600"
                >
                  <li className="flex items-end mr-2 mb-5">
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
                </Link>
              )}
              {store.options.navbar.links.contact.exists && (
                <Link
                  href={home ? "" : "/#contact"}
                  onClick={(e) => {
                    contactScroll(e), setSidebarOpened(false);
                  }}
                  className="cursor-pointer underline hover:no-underline
                  text-blue-600 hover:text-blue-800 
                  visited:text-purple-600"
                >
                  <li className="flex items-end mr-2 mb-5">
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
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
