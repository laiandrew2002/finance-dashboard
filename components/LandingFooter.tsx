import Image from "next/image";
import { Footer, FooterBottom } from "./ui/footer";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="dark w-full px-8 py-4">
      <div className="mx-auto max-w-container">
        <Footer className="pt-0">
          <FooterBottom className="border-none mt-0 flex flex-col items-center gap-4 sm:flex-col md:flex-row text-sm md:text-base">
            <div className="flex gap-4 flex-col sm:flex-row justify-center items-center mb-6 sm:mb-0">
              <Image
                src="/logo.svg"
                width={40}
                height={24}
                alt="logo"
                className="shadow-sm"
              />
              <div className="text-center">
                © 2025 FinTrack. All rights reserved.
              </div>
            </div>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
              <Link href="/sign-in">Sign in</Link>
              <Link className="mr-0 sm:mr-6" href="/sign-up">
                Sign up
              </Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
