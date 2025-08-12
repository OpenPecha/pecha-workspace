#!/usr/bin/env node

// Deploy script for Render - handles existing database
// This works better than shell script on Render

const { execSync } = require("child_process");

function runCommand(command, description) {
  console.log(`🔧 ${description}...`);
  try {
    execSync(command, { stdio: "inherit" });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    throw error;
  }
}

async function deploy() {
  console.log("🚀 Starting deployment...");

  try {
    // Install dependencies
    runCommand("npm install", "Installing dependencies");

    // Check migration status and baseline if needed
    console.log("🔍 Checking database migration status...");

    try {
      // Try to check migration status
      execSync("npx prisma migrate status", { stdio: "pipe" });
      console.log("✅ Database migrations are in sync");
    } catch (error) {
      const output = error.stdout?.toString() || error.stderr?.toString() || "";

      if (output.includes("Database schema is not empty")) {
        console.log("⚠️  Database is not empty, baselining...");
        runCommand(
          "npx prisma migrate resolve --applied 20250812100401_init",
          "Baselining database"
        );
      } else {
        console.log("ℹ️  Migration status check output:", output);
      }
    }

    // Deploy migrations
    runCommand("npx prisma migrate deploy", "Deploying migrations");

    // Generate Prisma client
    runCommand("npx prisma generate", "Generating Prisma client");

    // Build application
    runCommand("npm run build", "Building application");

    console.log("🎉 Deployment completed successfully!");
  } catch (error) {
    console.error("💥 Deployment failed:", error.message);
    process.exit(1);
  }
}

deploy();
