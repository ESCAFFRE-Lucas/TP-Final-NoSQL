import type { CookieSerializeOptions } from 'cookie';

export const defaultCookiesOptions: CookieSerializeOptions = {
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 3
};

export {}