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
            Why coffee..?
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex flex-col sm:flex-row items-center">
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              Life is better with coffee
            </h1>
            <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
              Always it is..!
            </h1>

            <p className="max-w-xl mt-2">
              Coffee is a drink prepared from roasted coffee beans. Darkly
              colored, bitter, and slightly acidic, coffee has a stimulating
              effect on humans, primarily due to its caffeine content. It has
              the highest sales in the world market for hot drinks.
            </p>
          </div>
          <div className="relative">
            <Image
              alt="coffee"
              src={
                "https://salesforce-cloud-commerce.vercel.app/_next/image?url=%2Fhero.jpg&w=1920&q=75"
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
