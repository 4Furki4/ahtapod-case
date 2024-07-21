"use client"
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
    const { theme } = useTheme();
    return (
        <main className="grid place-items-center w-full h-full my-auto p-4 sm:p-0">
            <SignUp appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
            }} />
        </main>
    )
}