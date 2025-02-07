import { cn } from "@/lib/utils";
import { CardStack } from "./ui/card-stack";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
};

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-12">
      <h2 className="mb-4 text-3xl md:text-5xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-neutral-100 to-neutral-600 md:text-center font-sans">
        What Our Users Say
      </h2>
      <div className="light-theme flex items-center justify-center w-full h-[24rem]">
        <CardStack items={CARDS} />
      </div>
    </div>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    title: (
      <>
        <p>Game-Changer for My Finances!</p>
        <h4>⭐⭐⭐⭐⭐</h4>
      </>
    ),
    content: (
      <p className="">
        &rdquo;FinTrack has completely transformed how I manage my expenses. The
        AI-driven insights help me budget smarter, and the dashboard is super
        intuitive!&rdquo;
      </p>
    ),
  },
  {
    id: 1,
    name: "James L., Small Business Owner",
    title: (
      <>
        <p>Seamless and Efficient</p>
        <h4>⭐⭐⭐⭐⭐</h4>
      </>
    ),
    content: (
      <p>
        &rdquo;I love how easy it is to track my spending and import
        transactions. The charts and graphs make financial planning a
        breeze!&rdquo;
      </p>
    ),
  },
  {
    id: 2,
    name: "Sophia M., Software Engineer",
    title: (
      <>
        <p>Best Financial Tracker I’ve Used</p>
        <h4>⭐⭐⭐⭐</h4>
      </>
    ),
    content: (
      <p>
        &rdquo;I’ve tried multiple finance apps, but FinTrack stands out with
        its clean interface and AI-powered recommendations. Highly
        recommend!&rdquo;
      </p>
    ),
  },
  {
    id: 3,
    name: "David T., Consultant",
    title: (
      <>
        <p>Helped Me Save More!</p>
        <h4>⭐⭐⭐⭐</h4>
      </>
    ),
    content: (
      <p>
        &rdquo;Thanks to FinTrack, I now have a clearer picture of my income and
        expenses. The AI tips have helped me cut unnecessary costs and save
        more!&rdquo;
      </p>
    ),
  },
];

export default Testimonials;
