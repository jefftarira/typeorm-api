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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield typeorm_1.getRepository(User_1.User).find();
    return res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
    return res.json(user);
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
    if (user) {
        typeorm_1.getRepository(User_1.User).merge(user, req.body);
        const results = yield typeorm_1.getRepository(User_1.User).save(user);
        return res.json(results);
    }
    return res.status(404).json({ message: 'User not found' });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User).delete(req.params.id);
    return res.json(user);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map