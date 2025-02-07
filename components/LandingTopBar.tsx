"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";

const LandingTopBar = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 backdrop-blur-lg z-40 flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center gap-[2px]">
        <Image
          src="/logo.svg"
          width={36}
          height={36}
          alt="finTrack Logo"
          className="shadow-sm"
        />
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-8 list-none">
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#testimonials">Testimonials</Link>
          </li>
          <li>
            <Link href="#pricing">Pricing</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link href="#" className="w-full md:w-auto">
          <button className="p-[3px] relative w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full" />
            <div className="px-8 py-4 bg-black rounded-full relative group transition duration-200 text-slate-100 hover:bg-transparent">
              {isSignedIn ? "Dashboard" : "Get Started"}
            </div>
          </button>
        </Link>
        {isSignedIn && <UserButton />}
        <Menubar className="dark md:hidden">
          <MenubarMenu>
            <MenubarTrigger aria-label="Menu">
              <MenuIcon className="md:hidden size-6" />
            </MenubarTrigger>
            <MenubarContent className="dark">
              <MenubarItem>
                <Link href="#about" className="w-full">
                  About
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="#testimonials" className="w-full">
                  Testimonials
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="#pricing" className="w-full">
                  Pricing
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="#faq" className="w-full">
                  FAQ
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </aside>
    </header>
  );
};

export default LandingTopBar;
