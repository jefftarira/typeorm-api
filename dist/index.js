"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
function main() {
    app_1.default.listen(config_1.PORT);
    console.log(`Server on port ${config_1.PORT}`);
}
main();
//# sourceMappingURL=index.js.map