/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/',
    '/auth/new-verification',
]

/**
 * An array of routes that are use for authentication
 * These routes will redirect log in user to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password'
]


/**
 * A prefix used for authentication
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'


/**
 * The default redirect when a user is authenticatited
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'