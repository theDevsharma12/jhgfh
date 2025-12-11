import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.AIzaSyAbgyx_Pche9NE9dRounw1pu0_vUO5a1R8);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/generate", async (req, res) => {
  try {
    const userInput = req.body.prompt;

    const result = await model.generateContent(userInput);
    const output = result.response.text();

    res.json({ reply: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
