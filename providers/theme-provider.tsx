"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
