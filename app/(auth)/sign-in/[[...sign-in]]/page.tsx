import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col justify-center items-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47] dark:text-slate-100">
            Welcome Back
          </h1>
          <p className="text-base text-[#7E8CA0] dark:text-slate-400">
            Sign in to your account to continue
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-950 hidden lg:flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={128}
          height={128}
          className="w-32 h-32"
        />
      </div>
    </div>
  );
}
