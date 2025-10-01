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
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
let server = null;
function seedAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("🔍 Checking for admin user...");
            const existingAdmin = yield db_1.prisma.user.findUnique({
                where: { email: 'towsif@gmail.com' }
            });
            if (existingAdmin) {
                console.log("✅ Admin user already exists");
                return;
            }
            // Hash password and create admin user
            const hashedPassword = yield bcrypt_1.default.hash('12345678', 10);
            const admin = yield db_1.prisma.user.create({
                data: {
                    email: 'towsif@gmail.com',
                    password: hashedPassword,
                    name: 'Towsif'
                }
            });
            console.log("👑 Admin user created successfully:", admin.email);
        }
        catch (error) {
            console.error("❌ Error seeding admin user:", error);
            // Don't exit process here - server might still work without admin
        }
    });
}
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.prisma.$connect();
            console.log("✅ DB connection successful!!");
            // Seed admin user after DB connection is established
            yield seedAdminUser();
        }
        catch (error) {
            console.log("❌ DB connection failed! ❌");
            process.exit(1);
        }
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToDB();
            server = http_1.default.createServer(app_1.default);
            server.listen(process.env.PORT, () => {
                console.log(`🚀 Server is running on port ${process.env.PORT}`);
            });
            handleProcessEvents();
        }
        catch (error) {
            console.error("❌ Error during server startup:", error);
            process.exit(1);
        }
    });
}
function gracefulShutdown(signal) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn(`🔄 Received ${signal}, shutting down gracefully...`);
        if (server) {
            server.close(() => __awaiter(this, void 0, void 0, function* () {
                console.log("✅ HTTP server closed.");
                try {
                    yield db_1.prisma.$disconnect();
                    console.log("✅ Database disconnected.");
                }
                catch (error) {
                    console.error("❌ Error during database disconnection:", error);
                }
                console.log("Server shutdown complete.");
                process.exit(0);
            }));
        }
        else {
            process.exit(0);
        }
    });
}
function handleProcessEvents() {
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("uncaughtException", (error) => {
        console.error("💥 Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    });
    process.on("unhandledRejection", (reason) => {
        console.error("💥 Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
    });
}
// Start the application
startServer();
//# sourceMappingURL=server.js.map