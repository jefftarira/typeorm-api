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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const photo_routes_1 = __importDefault(require("./routes/photo.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        typeorm_1.createConnection();
        //middlewares
        app.use(cors_1.default());
        app.use(helmet_1.default());
        app.use(morgan_1.default('dev'));
        app.use(express_1.default.json());
        // routes
        app.use(user_routes_1.default);
        app.use(photo_routes_1.default);
        app.use('/auth', auth_routes_1.default);
        //  folder for store public files
        app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
        app.listen(config_1.default.port, () => {
            logger_1.default.info(`
      _______________________________________________
      🛡️  Server listening on port: ${config_1.default.port} 🛡️
      _______________________________________________`).on('error', (err) => {
                logger_1.default.error(err);
                process.exit(1);
            });
        });
    });
}
startServer();
//# sourceMappingURL=app.js.map