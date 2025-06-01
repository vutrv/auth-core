import { AuthAdapter, UserInput } from '../types';
import {
    generateAccessToken,
    generateRefreshToken,
    comparePassword,
    hashPassword,
    verifyRefreshToken,
  } from './utils';
  
  export const createAuthService = (adapter: AuthAdapter) => {
    return {
      register: async (body: UserInput) => {
        const { email, password } = body
        if (!email || !password) {
            throw new Error('Email and password are required')
        }
        const existing = await adapter.findByEmail(email);
        if (existing) throw new Error('Email already exists');
  
        const hashed = await hashPassword(password);
        const user = await adapter.createUser({ ...body, password: hashed });
  
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        return { accessToken, refreshToken };
      },
  
      login: async (body: UserInput) => {
        const { email, password } = body
        if (!email || !password) {
            throw new Error('Email and password are required')
        }
        const user = await adapter.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');
  
        const isValid = await comparePassword(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');
  
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        return { accessToken, refreshToken };
      },
  
      refreshToken: async (token: string) => {
        try {
          const decoded = verifyRefreshToken(token) as { userId: number };
          const accessToken = generateAccessToken(decoded.userId);
          return { accessToken };
        } catch (err) {
          throw new Error('Invalid refresh token');
        }
      }
    };
  };
  