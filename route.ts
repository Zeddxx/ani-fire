export const publicRoutes = [
    "/",
    "/home",
    "/:id",
    "/watch/:id",
    "/anime/:id",
    "/community",
    "/genre/:id",
    "/search",
    "/watchlist"
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/home"