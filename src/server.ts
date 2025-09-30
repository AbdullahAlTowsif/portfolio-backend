import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import bcrypt from "bcrypt";

dotenv.config();

let server: Server | null = null;

async function seedAdminUser() {
  try {
    console.log("🔍 Checking for admin user...");
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'towsif@gmail.com' }
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Hash password and create admin user
    const hashedPassword = await bcrypt.hash('12345678', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'towsif@gmail.com',
        password: hashedPassword,
        name: 'Towsif'
      }
    });

    console.log("👑 Admin user created successfully:", admin.email);
    
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    // Don't exit process here - server might still work without admin
  }
}

async function connectToDB() {
  try {
    await prisma.$connect()
    console.log("✅ DB connection successful!!")
    
    // Seed admin user after DB connection is established
    await seedAdminUser();
    
  } catch (error) {
    console.log("❌ DB connection failed! ❌")
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDB()
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("✅ HTTP server closed.");

      try {
        await prisma.$disconnect();
        console.log("✅ Database disconnected.");
      } catch (error) {
        console.error("❌ Error during database disconnection:", error);
      }

      console.log("Server shutdown complete.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
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