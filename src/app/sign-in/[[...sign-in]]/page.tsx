"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
    const { theme } = useTheme();
    return (
        <main className="grid place-items-center w-full h-full my-auto">
            <SignIn appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
            }} />
        </main>);
}