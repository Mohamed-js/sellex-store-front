import Image from "next/image";

const About = () => {
  return (
    <>
      <div
        className="sm:py-15 mx-auto max-w-7xl py-16 pt-20 px-4 sm:px-6 lg:px-8"
        id="about"
      >
        <div className="text-center">
          <p className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
            Why us..?
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
        <div className="mx-auto flex flex-col sm:flex-row items-center">
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10 mb-5 sm:mr-2">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              Quality is a thing that we guarantee
            </h1>

            <h4 className="text-xl font-normal text-gray-600 sm:text-2xl sm:tracking-tight max-w-xl mt-2">
              Use our simple and FREE designer to instantly generate custom
              T-shirt design copy for yourself and enjoy.
            </h4>
          </div>
          <div className="relative">
            <Image
              alt="product"
              src={
                "https://res.cloudinary.com/atefcloud/image/upload/v1675264173/e74zn79tcnwt5upva4vev9tsf7v1.webp"
              }
              width={560}
              height={640}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
