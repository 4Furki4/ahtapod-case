'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Moon, Sun } from "lucide-react"
import { Button } from './ui/button'

export default function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    function handleChange() {
        setTheme(theme === 'dark' ?
            'light' : 'dark')
    }
    // // useEffect only runs on the client, so now we can safely show the UI
    // useEffect(() => {
    //     setMounted(true)
    // }, [])

    // if (!mounted) {
    //     return null
    // }
    return (
        <Button variant="outline" size="icon" onClick={handleChange}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
