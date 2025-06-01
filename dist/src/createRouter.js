"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const authService_1 = require("./core/authService");
const createAuthRouter = (adapter) => {
    const router = express_1.default.Router();
    const service = (0, authService_1.createAuthService)(adapter);
    router.post('/register', async (req, res) => {
        try {
            const result = await service.register(req.body);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
    router.post('/login', async (req, res) => {
        try {
            const result = await service.login(req.body);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
    router.post('/refresh', async (req, res) => {
        try {
            const { refreshToken } = req.body;
            const result = await service.refreshToken(refreshToken);
            res.json(result);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
    return router;
};
exports.createAuthRouter = createAuthRouter;
