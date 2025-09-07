import "dotenv/config";
import mongoose from "mongoose";

console.log("🔍 Job Portal PRO - Diagnostic Tool");
console.log("=====================================");

// Check environment variables
console.log("\n📋 Environment Variables:");
console.log(
  "- MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Set" : "❌ Missing"
);
console.log("- JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Missing");
console.log("- PORT:", process.env.PORT || "❌ Missing");
console.log("- CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN || "❌ Missing");

// Test MongoDB connection
if (process.env.MONGODB_URI) {
  console.log("\n🗄️  Testing MongoDB Connection:");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connection successful");
    await mongoose.disconnect();
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
  }
} else {
  console.log("\n❌ Cannot test MongoDB - MONGODB_URI not set");
}

// Test imports
console.log("\n📦 Testing Imports:");
try {
  const express = await import("express");
  console.log("✅ Express imported successfully");
} catch (error) {
  console.log("❌ Express import failed:", error.message);
}

try {
  const { z } = await import("zod");
  console.log("✅ Zod imported successfully");
} catch (error) {
  console.log("❌ Zod import failed:", error.message);
}

console.log("\n✨ Diagnostic complete!");
