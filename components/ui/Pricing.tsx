import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, User, Users } from "lucide-react";
import Link from "next/link";

type Plan = {
  name: string;
  icon?: React.ReactNode;
  description: string;
  price: number;
  priceNote: string;
  cta: {
    variant: "outline" | "default";
    label: string;
    href: string;
  };
  features: string[];
  featured: boolean;
  classes?: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    description: "For everyone starting out on a website for their big idea",
    price: 0,
    priceNote: "Free and open-source forever.",
    cta: {
      variant: "outline",
      label: "Get started for free",
      href: "/docs/getting-started/introduction",
    },
    features: [
      "9 landing page sections",
      "36 components",
      "5 custom animations",
    ],
    featured: false,
    classes: "bg-transparent border border-input hidden lg:flex",
  },
  {
    name: "Pro",
    icon: <User className="h-4 w-4" />,
    description: "For early-stage founders, solopreneurs and indie devs",
    price: 99,
    priceNote: "Lifetime access. Free updates. No recurring fees.",
    cta: {
      variant: "default",
      label: "Get all-access",
      href: "/",
    },
    features: [
      `72 landing page sections`,
      `100 components`,
      `12 illustrations`,
      `15 custom animations`,
    ],
    featured: true,
    classes:
      "after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-brand-foreground/70 after:blur-[72px]",
  },
  {
    name: "Pro Team",
    icon: <Users className="h-4 w-4" />,
    description: "For teams and agencies working on cool products together",
    price: 499,
    priceNote: "Lifetime access. Free updates. No recurring fees.",
    cta: {
      variant: "default",
      label: "Get all-access for your team",
      href: "/",
    },
    features: [
      "All the templates, components and sections available for your entire team",
    ],
    featured: false,
    classes:
      "after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-[100%] after:max-w-[960px] after:-translate-x-1/2 after:rounded-[50%] after:bg-primary/30 after:blur-[72px]",
  },
];

export default function Pricing() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 my-12">
        <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
          <h2 className="mb-4 text-3xl md:text-5xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-neutral-100 to-neutral-600 md:text-center font-sans">
            Take Control of Your Finances today.
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            Get lifetime access to all the features. No recurring fees. Just
            simple, transparent pricing.
          </p>
        </div>
        <div className="mx-auto grid max-w-container grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex max-w-container flex-col gap-6 overflow-hidden rounded-2xl bg-primary/5 p-8",
                plan.classes,
              )}
            >
              <hr
                className={cn(
                  "absolute left-[10%] top-0 h-[1px] w-[80%] border-0 bg-gradient-to-r from-transparent via-foreground/60 to-transparent",
                  plan.featured && "via-brand",
                )}
              />
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <h2 className="flex items-center gap-2 font-bold">
                    {plan.icon && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {plan.icon}
                      </div>
                    )}
                    {plan.name}
                  </h2>
                  <p className="max-w-[220px] text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:flex-col lg:items-start xl:flex-row xl:items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-muted-foreground">
                      $
                    </span>
                    <span className="text-6xl font-bold">{plan.price}</span>
                  </div>
                  <div className="flex min-h-[40px] flex-col">
                    {plan.price > 0 && (
                      <>
                        <span className="text-sm">one-time payment</span>
                        <span className="text-sm text-muted-foreground">
                          plus local taxes
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Button variant={plan.cta.variant} size="lg" asChild>
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
                <p className="min-h-[40px] max-w-[220px] text-sm text-muted-foreground">
                  {plan.priceNote}
                </p>
                <hr className="border-input" />
              </div>
              <div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CircleCheckBig className="h-4 w-4 shrink-0 text-muted-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
