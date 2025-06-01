import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'au_access_se';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET || 'au_refresh_se';

export const hashPassword = (pw: string) => bcrypt.hash(pw, 10);

export const comparePassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);

export const generateAccessToken = (userId: string | number) =>
  jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

export const generateRefreshToken = (userId: string | number) =>
  jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET);
