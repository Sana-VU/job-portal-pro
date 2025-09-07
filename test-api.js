const axios = require("axios");

async function testAPI() {
  try {
    console.log("Testing server health...");
    const healthResponse = await axios.get("http://localhost:3001/health");
    console.log("✅ Health check:", healthResponse.data);

    console.log("\nTesting jobs endpoint...");
    const jobsResponse = await axios.get("http://localhost:3001/jobs");
    console.log("✅ Jobs endpoint:", jobsResponse.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

testAPI();
