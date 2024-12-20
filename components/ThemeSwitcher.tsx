"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      {/* Custom Switch Container */}
      <div
        className={cn(
          "relative flex items-center w-16 h-8 rounded-full",
          theme === "dark" ? "bg-black" : "bg-gray-300",
        )}
      >
        {/* Sun and Moon Icons */}
        <div className="absolute flex items-center justify-between w-full px-2">
          <Sun
            className={cn(
              "w-5 h-5 transition-opacity",
              theme === "dark" ? "opacity-0" : "opacity-100",
            )}
          />
          <Moon
            className={cn(
              "w-5 h-5 transition-opacity",
              theme === "dark" ? "opacity-100" : "opacity-0",
            )}
            color={theme === "dark" ? "white" : "transparent"}
          />
        </div>
        <div
          className={cn(
            "absolute h-6 w-6 bg-white rounded-full shadow-md transition-transform",
            theme !== "dark" ? "translate-x-8" : "translate-x-2",
          )}
        />
        {/* Switch Component */}
        <Switch
          checked={theme === "dark"}
          onCheckedChange={handleThemeChange}
          className="absolute inset-0 opacity-0" // Hide the default UI
        />
      </div>
    </div>
  );
};
