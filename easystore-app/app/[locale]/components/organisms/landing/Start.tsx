import Image from 'next/image';

export default function Start() {
  return (
    <section className="mx-auto px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-16 lg:px-14">
      <h2 className="text-title mb-12 text-center text-5xl font-extrabold xl:text-left">
        Starting to sell is very easy
      </h2>

      <div className="flex flex-col items-center gap-8 px-10 xl:flex-row xl:items-start xl:justify-between">
        {/* Left column - Numbered steps */}
        <div className="flex w-full max-w-md flex-col items-center gap-8 md:items-start">
          {/* Step 1 */}
          <div className="flex w-full max-w-sm flex-col text-center md:text-left">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-secondary text-xl font-bold">1.</span>
              <h3 className="text-text font-regular text-2xl sm:text-3xl">
                Add your products
              </h3>
            </div>
            <div className="border-t border-gray-200 pt-4"></div>
          </div>

          {/* Step 2 */}
          <div className="flex w-full max-w-sm flex-col text-center md:text-left">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-secondary text-xl font-bold">2.</span>
              <h3 className="text-text font-regular text-2xl sm:text-3xl">
                Customize your store
              </h3>
            </div>
            <div className="border-t border-gray-200 pt-4"></div>
          </div>

          {/* Step 3 */}
          <div className="flex w-full max-w-sm flex-col text-center md:text-left">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-secondary text-xl font-bold">3.</span>
              <h3 className="text-text font-regular text-2xl sm:text-3xl">
                Set up payments
              </h3>
            </div>
            <div className="border-t border-gray-200 pt-4"></div>
          </div>
        </div>

        {/* Right column - Imágenes */}
        <div className="hidden md:flex-1 md:items-start md:justify-start xl:flex">
          <div className="grid grid-cols-3 justify-items-start gap-x-20">
            <div className="mt-0">
              <Image
                src="/start_1.webp"
                alt="Add products"
                layout="responsive"
                width={241}
                height={275}
                className="rounded-lg"
              />
            </div>
            <div className="mt-12">
              <Image
                src="/start_2.webp"
                alt="Customize store"
                layout="responsive"
                width={241}
                height={275}
                className="rounded-lg"
              />
            </div>
            <div className="mt-0">
              <Image
                src="/start_3.webp"
                alt="Set up payments"
                layout="responsive"
                width={241}
                height={275}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
