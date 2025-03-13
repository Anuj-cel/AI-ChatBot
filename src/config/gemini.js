const Gemini_Api_Key="AIzaSyDjrtJdNfyUkXIPBhHcp9HOOjjW7bLDjks" 

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyDjrtJdNfyUkXIPBhHcp9HOOjjW7bLDjks");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// const response =result.response;
// console.log(response.text())
import { GoogleGenerativeAI }  from '@google/generative-ai';

// Use an environment variable for the API key (Recommended)
// const Gemini_Api_Key = process.env.GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(Gemini_Api_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runChat(input) {
    try {
        
        const result = await model.generateContent(input);
        
        // Correct way to get response text
        const response = await result.response.text();
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error generating content:", error);
    }
   
}

// Call the function
export default runChat;
