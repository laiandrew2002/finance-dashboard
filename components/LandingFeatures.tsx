import { Card } from "./ui/card";
import {
  ChartCandlestickIcon,
  HandCoinsIcon,
  BrainIcon,
  BotIcon,
} from "lucide-react";

const LandingFeatures = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-48 mb-28">
      <h2 className="text-3xl md:text-5xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-neutral-100 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r">
        Why Choose FinTrack?
      </h2>

      <p className="max-w-2xl text-base md:text-xl mt-8 mb-8 text-neutral-200">
        Track, Analyze, and Optimize Your Expenses with AI-Powered Insights.
      </p>
      <div className="dark max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 text-center mt-4 px-6">
        <Card className="p-4">
          <div className="my-4 text-primary flex items-center justify-center">
            <HandCoinsIcon className="size-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">
            Manual & Automated Expense Tracking
          </h3>
          <p className="text-slate-400 pb-4">
            Easily input daily transactions or sync with your bank for automated
            imports.
          </p>
        </Card>

        <Card className="p-4">
          <div className="my-4 text-primary flex items-center justify-center">
            <BrainIcon className="size-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">
            Smart Budgeting & Categorization
          </h3>
          <p className="text-slate-400 pb-4">
            AI-powered categorization of expenses and income for better
            tracking.
          </p>
        </Card>

        <Card className="p-4">
          <div className="my-4 text-primary flex items-center justify-center">
            <BotIcon className="size-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">
            AI-Driven Financial Advice
          </h3>
          <p className="text-slate-400 pb-4">
            Personalized recommendations to optimize your spending and saving
            habits.
          </p>
        </Card>

        <Card className="p-4">
          <div className="my-4 text-primary flex items-center justify-center">
            <ChartCandlestickIcon className="size-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">
            Visual Insights & Reports
          </h3>
          <p className="text-slate-400 pb-4">
            Interactive graphs and charts for a clear understanding of your
            monthly trends.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LandingFeatures;
