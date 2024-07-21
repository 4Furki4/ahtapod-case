import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Make sure that the `/api/webhooks/(.*)` route is not protected here
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
]);
export default clerkMiddleware((auth, req) => {
    const { has, redirectToSignIn } = auth()

    if (isProtectedRoute(req) &&
        !has({ role: 'org:manager' })) {

        // Add logic to run if the user does not have the required permissions
        return NextResponse.redirect(new URL('/', req.url))
    }
});
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};