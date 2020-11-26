"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function TokenValidation(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ message: 'Access denied' });
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        res.locals.userId = payload._id;
    }
    catch (e) {
        return res.status(401).json({ message: 'Can not verify token', error: e });
    }
    next();
}
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map