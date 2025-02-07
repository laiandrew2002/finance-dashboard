import Image from "next/image";
import { Footer, FooterBottom } from "./ui/footer";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="dark w-full px-8 py-4">
      <div className="mx-auto max-w-container">
        <Footer className="pt-0">
          <FooterBottom className="border-none mt-0 flex flex-col items-center gap-4 sm:flex-col md:flex-row text-sm md:text-base">
            <div className="flex gap-4">
              <Image
                src="/logo.svg"
                width={40}
                height={24}
                alt="logo"
                className="shadow-sm"
              />
              © 2025 FinTrack. All rights reserved
            </div>
            <div className="flex items-center gap-4">
              <Link href="#">Sign in</Link>
              <Link href="#">Sign up</Link>|<Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
