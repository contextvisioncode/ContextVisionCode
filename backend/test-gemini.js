require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModels() {
    const modelsToTest = [
        "gemini-pro",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-1.5-pro-002",
        "models/gemini-pro",
        "models/gemini-1.5-pro"
    ];

    for (const modelName of modelsToTest) {
        try {
            console.log(`\nTesting model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const response = await result.response;
            const text = response.text();
            console.log(`✅ SUCCESS: ${modelName}`);
            console.log(`Response: ${text.substring(0, 50)}...`);
            break; // Stop on first success
        } catch (error) {
            console.log(`❌ FAILED: ${modelName}`);
            console.log(`Error: ${error.message}`);
        }
    }
}

testModels();
