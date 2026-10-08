require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/ask-ai", async (req, res) => {
try {
const { question } = req.body;

if (!question || !question.trim()) {
return res.status(400).json({
error: "Please enter a question."
});
}

const response = await openai.responses.create({
model: "gpt-6-luna",
input: question
});

res.json({
answer: response.output_text
});

} catch (error) {
console.error("ONLINE AI ERROR:", error);

res.status(500).json({
error: error.message || "OpenAI request failed."
});
}
});

app.listen(3000, () => {
console.log("Student app running at http://localhost:3000");
});

