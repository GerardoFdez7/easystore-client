import Pricing from '@molecules/shared/Pricing';

export default function Main() {
  return (
    <main className="mt-10 md:mx-20 xl:mx-35">
      <div className="px-5">
        <h1 className="text-title mb-2 text-[32px] font-extrabold sm:text-4xl 2xl:text-5xl">
          Your Business Details
        </h1>
        <p className="text-primary tex-[16px] mb-8 2xl:text-xl">
          Tell us about your business and choose a plan
        </p>

        <div className="mb-15">
          <label
            htmlFor="businessName"
            className="tex-[16px] text-foreground mb-2 block font-medium 2xl:text-xl"
          >
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            className="tex-[16px] text-foreground border-primary focus:ring-primary h-[56px] w-full rounded-md border-1 bg-transparent p-3 focus:ring-2 focus:outline-none md:w-[593px] 2xl:text-xl"
          />
        </div>
      </div>
      <Pricing />
      <div className="my-12 flex justify-center">
        <button className="bg-primary w-xs rounded-full py-3 font-medium text-white sm:w-xl">
          Confirm & Register
        </button>
      </div>
    </main>
  );
}
