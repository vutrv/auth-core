"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthService = void 0;
const utils_1 = require("./utils");
const createAuthService = (adapter) => {
    return {
        register: async (body) => {
            const { email, password } = body;
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            const existing = await adapter.findByEmail(email);
            if (existing)
                throw new Error('Email already exists');
            const hashed = await (0, utils_1.hashPassword)(password);
            const user = await adapter.createUser({ ...body, password: hashed });
            const accessToken = (0, utils_1.generateAccessToken)(user.id);
            const refreshToken = (0, utils_1.generateRefreshToken)(user.id);
            return { accessToken, refreshToken };
        },
        login: async (body) => {
            const { email, password } = body;
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            const user = await adapter.findByEmail(email);
            if (!user)
                throw new Error('Invalid credentials');
            const isValid = await (0, utils_1.comparePassword)(password, user.password);
            if (!isValid)
                throw new Error('Invalid credentials');
            const accessToken = (0, utils_1.generateAccessToken)(user.id);
            const refreshToken = (0, utils_1.generateRefreshToken)(user.id);
            return { accessToken, refreshToken };
        },
        refreshToken: async (token) => {
            try {
                const decoded = (0, utils_1.verifyRefreshToken)(token);
                const accessToken = (0, utils_1.generateAccessToken)(decoded.userId);
                return { accessToken };
            }
            catch (err) {
                throw new Error('Invalid refresh token');
            }
        }
    };
};
exports.createAuthService = createAuthService;
