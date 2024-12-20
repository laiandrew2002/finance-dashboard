"use client";

import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { HeaderLogo } from "./HeaderLogo";
import { Navigation } from "./Navigation";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "./WelcomeMsg";
import { Filters } from "./Filters";
import { usePathname } from "next/navigation";
import FinancialAdvice from "./FinancialAdvise";
import { Suspense } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const isShowFilters =
    !pathname.startsWith("/accounts") && !pathname.startsWith("/categories");

  return (
    <header
      className={cn(
        "px-4 py-8 lg:px-14 pb-36",
        theme === "dark"
          ? "bg-gradient-to-b from-black to-gray-700"
          : "bg-gradient-to-b from-blue-950 to-blue-800",
      )}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex flex-row space-x-4">
            <ThemeSwitcher />
            <ClerkLoaded>
              <UserButton />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </ClerkLoading>
          </div>
        </div>
        <WelcomeMsg />
        <Suspense>
          <FinancialAdvice />
        </Suspense>
        {isShowFilters && <Filters />}
      </div>
    </header>
  );
};
