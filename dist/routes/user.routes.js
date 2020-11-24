"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get('/users', user_controller_1.getUsers);
router.get('/users/:id', user_controller_1.getUser);
router.put('/users/:id', user_controller_1.updateUser);
router.delete('/users/:id', user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map