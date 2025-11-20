import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { routeAccess } from './lib/routes';
import { NextResponse } from 'next/server';

// Public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/',
]);

// Create matchers from routeAccess
const matchers = Object.entries(routeAccess).map(([route, allowedRoles]) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles,
}));
export const middleware = clerkMiddleware(async (auth, request) => {
  console.log('Middleware running for:', request.nextUrl.pathname);
  
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  console.log('User ID:', userId);
  console.log('User role:', role);

  if (role && userId) {
    for (const { matcher, allowedRoles } of matchers) {
      if (matcher(request)) {
        console.log('Route matched, allowed roles:', allowedRoles);
        console.log('User has role:', role);
        
        if (!allowedRoles.includes(role)) {
          console.log('Access denied, redirecting...');
          return NextResponse.redirect(new URL(`/${role}`, request.url));
        }
      }
    }
  } else {
    console.log('No role found for user');
  }
});
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};