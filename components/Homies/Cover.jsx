import Image from "next/image";

export default function Cover({ scrollHandler, store }) {
  return (
    <header
      className="relative"
      style={{
        backgroundColor: `${store.options.cover.bg_color}`,
        textAlign: `${store.options.cover.content_horizontal_position}`,
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            {store.options.cover.background.exists && (
              <Image
                fill
                className="h-full w-full object-cover"
                src={store.options.cover.background.image}
                alt="Coffee grinder"
                style={{
                  backgroundPosition: `${store.options.cover.background.image_position}`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
            {/* The Overlay */}
            {store.options.cover.overlay.exists && (
              <div
                className="absolute inset-0 bg-orange-100 mix-blend-multiply"
                style={{
                  backgroundColor: store.options.cover.overlay.color,
                }}
              />
            )}
          </div>
          <div
            className="relative flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8"
            style={{
              height: `${store.options.cover.height}`,
              textAlign: `center`,
              // textAlign: `${store.options.cover.content_horizontal_position}`,
            }}
          >
            <p
              className="w-full relative left-0 right-0 mx-auto mt-5 text-xl font-semibold uppercase tracking-wide text-orange-500"
              style={{
                // color: `${store.options.cover.headline.color}`,
                // textAlign: `${store.options.cover.headline.text_align}`,
                // fontSize: `${store.options.cover.headline.font_size}`,
                backgroundColor: `${store.options.cover.headline.bg_color}`,
              }}
            >
              {store.options.navbar.logo.text}
            </p>
            <h1 className="mt-6 font-bold uppercase text-gray-900 text-3xl sm:text-5xl sm:tracking-tight lg:text-7xl">
              <span
                className="block"
                style={{
                  color: `${store.options.cover.description.color}`,
                  backgroundColor: `${store.options.cover.description.bg_color}`,
                  // fontSize: `${store.options.cover.description.font_size}`,
                  // textAlign: `${store.options.cover.description.text_align}`,
                }}
              >
                {store.options.cover.headline.text}
              </span>
              <span className="block text-orange-500">
                {store.options.cover.description.text}
              </span>
            </h1>

            <div
              // style={{ textAlign: `${store.options.cover.button.alignment}` }}
              className="w-full mx-auto mt-10 sm:max-w-none"
            >
              <button
                className="rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-orange-600 shadow-sm hover:bg-orange-100 sm:px-8"
                onClick={scrollHandler}
                style={{
                  backgroundColor: `${store.options.cover.button.bg_color}`,
                  // color: `${store.options.cover.button.color}`,
                  // fontSize: `${store.options.cover.button.font_size}`,
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
