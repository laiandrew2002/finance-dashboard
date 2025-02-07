import HowItWorks from "@/components/HowItWorks";
import LandingFeatures from "@/components/LandingFeatures";
import { LandingFooter } from "@/components/LandingFooter";
import LandingTopBar from "@/components/LandingTopBar";
import FAQ from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/connect-parallax";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clients, products } from "@/lib/constant";
import Image from "next/image";
import Pricing from "@/components/ui/Pricing";

export default function Page() {
  return (
    <main className="flex items-center justify-center flex-col">
      <LandingTopBar />

      <section className="h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#020617_35%,#0206_100%)]"></div>
        <div className="flex flex-col mt-[40px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                    Get Started for Free
                  </span>
                </Button>
                <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Take Control of Your Finances with FinTrack
                </h1>
              </div>
            }
          >
            <Image
              src={`/banner-image.png`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover justify-center h-full"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </section>

      <section className="w-full">
        <InfiniteMovingCards
          className="md:mt-[18rem] mt-[-100px]"
          items={clients}
          direction="right"
          speed="slow"
        />
      </section>

      <section className="w-full" id="about">
        <HeroParallax products={products} />
        <LandingFeatures />
        <HowItWorks />
      </section>

      <section className="w-full" id="testimonials">
        <Testimonials />
      </section>

      <section className="w-full" id="pricing">
        <Pricing />
      </section>

      <section className="w-full" id="faq">
        <FAQ />
      </section>
      <LandingFooter />
    </main>
  );
}
