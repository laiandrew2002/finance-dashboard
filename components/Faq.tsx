import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

export default function FAQ() {
  return (
    <div className="mx-auto flex max-w-container flex-col items-center gap-8 py-16 px-6 sm:px-12">
      <h2 className="mb-4 text-3xl md:text-5xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-neutral-100 to-neutral-600 md:text-center font-sans">
        Questions and Answers
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-[800px] text-slate-200"
      >
        <AccordionItem value="item-1" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Why building a great landing page is critical for your business?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[640px] text-balance">
              In today&apos;s AI-driven world, standing out is harder than ever.
              While anyone can build a product, a professional landing page
              makes the difference between success and failure.
            </p>
            <p className="mb-4 max-w-[640px] text-balance">
              Launch UI helps you ship faster without compromising on quality.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Why use Launch UI instead of a no-code tool?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[600px]">
              No-code tools lock you into their ecosystem with recurring fees
              and limited control. They often come with performance issues and
              make it difficult to integrate with your product.
            </p>
            <p className="mb-4 max-w-[600px]">
              You can&apos;t even change your hosting provider and basic things
              like web analytics come as extra costs and paid add-ons.
            </p>
            <p className="mb-4 max-w-[600px]">
              What might seem like a convenient solution today could paint you
              into a corner tomorrow, limiting your ability to scale and adapt.
              Launch UI gives you full control of your code while maintaining
              professional quality.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            How Launch UI is different from other components libraries and
            templates?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Launch UI stands out with premium design quality and delightful
              touches of custom animations and illustrations.
            </p>
            <p className="mb-4 max-w-[580px]">
              All components are carefully crafted to help position your product
              as a professional tool, avoiding the generic template look.
            </p>
            <p className="mb-4 max-w-[640px] text-balance">
              Unlike many libraries that rely on outdated CSS practices and old
              dependencies, Launch UI is built with modern technologies and best
              practices in mind.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Why exactly does it mean that &quot;The code is yours&quot;?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              The basic version of Launch UI is open-source and free forever,
              under a do-whatever-you-want license.
            </p>
            <p className="mb-4 max-w-[580px]">
              The pro version that contains more components and options is a
              one-time purchase that gives you lifetime access to all current
              and future content. Use it for unlimited personal and commercial
              projects - no recurring fees or restrictions.
            </p>
            <p className="mb-4 max-w-[580px]">
              For complete details about licensing and usage rights, check out{" "}
              <Link href="/pricing" className="text-primary underline">
                the pricing page
              </Link>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Are Figma files included?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Yes! The complete Launch UI template is available for free on the{" "}
              <Link
                href="https://www.figma.com/community/file/1420131743903900629/launch-ui-landing-page-components-ui-kit"
                className="text-primary underline"
              >
                Figma community
              </Link>
              .
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
