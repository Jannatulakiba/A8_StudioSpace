import { jwt } from "better-auth"
import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

/**
 * No explicit baseURL: the auth server is same-origin (/api/auth/[...all]),
 * so better-auth defaults to window.location.origin. Note that
 * process.env.BETTER_AUTH_URL is server-side only (not NEXT_PUBLIC_*, so it
 * would be undefined in the browser bundle anyway).
 */
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
     plugins: [
        jwtClient(), 
    ]
})