import Link from 'next/link'
import ModeToggle from './ModeToggle'
import { Button } from './ui/button'
import { UserButton } from '@clerk/nextjs'

export default function Navbar({
    isSignedIn,
    isManager
}: {
    isSignedIn: boolean,
    isManager?: boolean
}) {
    return (
        <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2 p-2'>
            <nav className='max-w-6xl mx-auto'>
                <ul className='flex gap-4 items-center justify-center'>
                    <li>
                        <Link href={'/'}>
                            <Button variant={'link'}>
                                Home
                            </Button>
                        </Link>
                    </li>
                    {isManager ? (
                        <li className='ml-auto'>
                            <Link href={'/dashboard'}>
                                <Button variant={'link'}>
                                    Dashboard
                                </Button>
                            </Link>
                        </li>
                    ) : null}
                    <li className='ml-auto'>
                        <ModeToggle />
                    </li>
                    <li className='flex items-center'>
                        {isSignedIn ?
                            <UserButton />
                            : (
                                <Link href={'/sign-in'}>
                                    <Button>
                                        Sign in
                                    </Button>
                                </Link>
                            )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}
