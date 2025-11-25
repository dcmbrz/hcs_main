import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { routeAccess } from './lib/routes';
import { NextResponse } from 'next/server';

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);

  // Determine user role
  const role = 
    userId && sessionClaims?.metadata?.role
      ? (sessionClaims.metadata.role as string)
      : userId
      ? "patient"
      : "sign-in";

  // Skip middleware for sign-in/sign-up pages to avoid redirect loops
  if (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up')) {
    return NextResponse.next();
  }

  // Find matching route
  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute) {
    // Check if user's role is allowed
    if (!matchingRoute.allowedRoles.includes(role)) {
      // Redirect to role-appropriate page
      const redirectPath = userId ? `/${role}` : '/sign-in';
      return NextResponse.redirect(new URL(redirectPath, url.origin));
    }
  }

  // Allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};