import { AUTH_PAGE } from "@/constants/auth.constants";
import AuthWrapper from "@/containers/auth/AuthWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        {/* Left Panel */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          {/* Left BG Color */}
          <div className="absolute inset-0 bg-zinc-900" />

          {/* Organization Logo */}
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            {AUTH_PAGE.left.organization}
          </div>

          {/* Quote Section */}
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;{AUTH_PAGE.left.quote}&rdquo;
              </p>
              <footer className="text-sm">{AUTH_PAGE.left.quoteName}</footer>
            </blockquote>
          </div>

        </div>

        {/* Right Panel */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[100%]">
            
            {/* Auth Panel */}
            <AuthWrapper />

            {/* Footer */}
            <p className="px-8 text-center text-sm text-muted-foreground">
             {AUTH_PAGE.right.footerTitle}{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                {AUTH_PAGE.right.termsAndPolicies.split(" ")[0]}
              </Link>{" "}
              {AUTH_PAGE.right.termsAndPolicies.split(" ")[1]}{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                {AUTH_PAGE.right.termsAndPolicies.split(" ")[2]}
              </Link>.
            </p>
            
          </div>
        </div>
      </div>
    </main>
  );
}
