"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const config_1 = require("../config");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = typeorm_1.getRepository(User_1.User).create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    newUser.password = yield newUser.encryptPassword(newUser.password);
    const createdUser = yield typeorm_1.getRepository(User_1.User).save(newUser);
    return res.json({
        message: 'User created',
        id: createdUser.id,
        email: createdUser.email,
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User).findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ message: 'Email or password ir worng!' });
    const isCorrectPassword = yield user.validatePassword(req.body.password);
    if (!isCorrectPassword)
        return res.status(400).json({ message: 'Password is worng!' });
    const token = jsonwebtoken_1.default.sign({ _id: user.id }, config_1.TOKEN_SECRET, {
        expiresIn: 86400,
    });
    return res
        .header('auth-token', token)
        .json({ message: 'User authenticated' });
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ message: 'profile' });
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map