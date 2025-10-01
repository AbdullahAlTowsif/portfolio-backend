"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./modules/user/user.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const blog_routes_1 = require("./modules/blog/blog.routes");
const project_routes_1 = require("./modules/project/project.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/v1/user", user_routes_1.UserRouter);
app.use("/api/v1/auth", auth_routes_1.AuthRouter);
app.use("/api/v1/blog", blog_routes_1.BlogRouter);
app.use("/api/v1/project", project_routes_1.ProjectRouter);
app.get("/", (_req, res) => {
    res.send("Portfolio Server is running");
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map