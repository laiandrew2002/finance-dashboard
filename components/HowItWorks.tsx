import {
  NotepadTextIcon,
  BrainCircuitIcon,
  PiggyBankIcon,
  UserRoundPenIcon,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: UserRoundPenIcon,
    title: "1. Sign up and set up your financial profile.",
    description:
      "Create your account in seconds and customize your financial profile to match your income, expenses, and financial goals.",
  },
  {
    icon: NotepadTextIcon,
    title: "2. Add expenses manually or import from your providers.",
    description:
      "Easily log your daily transactions or connect your accounts to automatically import from providers (Banks, Revolut, etc) and categorize your expenses.",
  },
  {
    icon: BrainCircuitIcon,
    title: "3. Analyze your spending with AI-powered insights and reports.",
    description:
      "Visualize your financial habits with interactive charts and AI-driven analytics, helping you track where your money goes.",
  },
  {
    icon: PiggyBankIcon,
    title:
      "4. Improve your financial health with personalized recommendations.",
    description:
      "Get tailored financial advice powered by AI to optimize your budget, reduce unnecessary spending, and grow your savings.",
  },
];

const HowItWorks = () => {
  return (
    <div className="dark max-w-3xl mx-auto my-12">
      <div className="space-y-12 pb-10 px-8">
        <h2 className="text-3xl md:text-5xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-neutral-100 to-neutral-600 md:text-center font-sans">
          How FinTrack Works
        </h2>
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6">
            <div className="w-12 h-12 flex items-center justify-center bg-background border-2 border-slate-300 text-slate-200 rounded-full">
              <step.icon />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-slate-200">
                {step.title}
              </h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="flex flex-col items-start w-full md:w-auto justify-center">
            <Link href="#" className="w-full md:w-auto">
              <button className="p-[3px] relative w-full md:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full" />
                <div className="px-8 py-4 bg-black rounded-full relative group transition duration-200 text-slate-100 hover:bg-transparent">
                  Get Started
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
