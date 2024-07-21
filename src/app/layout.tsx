import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import clsx from "clsx";
import { auth } from "@clerk/nextjs/server";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SyncActiveOrganization } from "@/components/SyncActiveOrganizations";

export const metadata: Metadata = {
  title: {
    template: '%s | Ahtapod',
    default: "Ahtapod Text Post App",
  },
  description: "Ahtapod is a text post app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, sessionClaims } = auth();
  const isSignedIn = !!userId;
  const isManager = sessionClaims?.org_role === "org:manager";
  return (
    <ClerkProvider>
      <SyncActiveOrganization membership={sessionClaims?.membership} />
      <html suppressHydrationWarning lang="en">
        <body className={clsx(inter.className, "min-h-screen bg-background")}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col bg-background">
                <Navbar isSignedIn={isSignedIn} isManager={isManager} />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster richColors />
              </div>
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
