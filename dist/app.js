"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = express_1.default();
typeorm_1.createConnection();
//middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// routes
app.use(user_routes_1.default);
app.use('/auth', auth_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map