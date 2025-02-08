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
            What is FinTrack?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[640px] text-balance">
              FinTrack is a finance tracker web app that helps you manage daily
              expenses, income, and investments. It offers AI-driven financial
              insights and automated data imports.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Is FinTrack free to use?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[600px]">
              Yes! FinTrack offers a free plan with manual expense tracking,
              basic AI insights, and monthly summaries. For more advanced
              features like automated imports and AI recommendations, we offer
              Pro and Premium plans.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            How does AI-powered financial advice work?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Our AI analyzes your spending habits, income trends, and goals to
              provide personalized financial recommendations. It can suggest
              budget optimizations, highlight unnecessary expenses, and help you
              achieve savings goals.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Does FinTrack support bank and crypto imports?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Yes! Our Pro and Premium plans allow you to securely connect your
              bank accounts and crypto wallets for automatic transaction
              tracking.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Can I create custom categories for tracking?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Absolutely! With our Premium plan, you can create unlimited custom
              categories to better track your expenses and income in a way that
              fits your lifestyle.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Is my financial data secure?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Yes, security is our top priority. FinTrack uses end-to-end
              encryption to protect your financial data and does not share it
              with third parties.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-start">
            Can I cancel my subscription anytime?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400">
            <p className="mb-4 max-w-[580px]">
              Yes! You can cancel your subscription at any time, and your plan
              will remain active until the end of your billing period.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
