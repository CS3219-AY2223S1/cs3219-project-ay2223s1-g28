import jwt from 'jsonwebtoken';
import { blacklistJwt, getBlacklistedJwt } from './jwt-repository.js';

const EXPIRATION = 86400; // 24hrs

export function ormGenerateJwt(user) {
    const username = user.username;
    return jwt.sign({ 'username': username }, process.env.JWT_SECRET_KEY, { expiresIn: EXPIRATION });
}

export function ormDecodeJwt(token) {
    return jwt.decode(token);
}

export async function ormBlacklistJwt(token) {
    await blacklistJwt(token);
}

export async function ormGetBlacklistedJwt(token) {
    return await getBlacklistedJwt(token);
}
