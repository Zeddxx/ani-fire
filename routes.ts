/**
 * An array of protected routes if user is unauthenticated they cannot get to this routes.
 * This will be out protected routes.
 * @type {string[]}
 */


export const protectedRoutes = [
    "/dashboard",
    "/settings",
]

/**
 * This routes are used for authentication.
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register"
]

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"