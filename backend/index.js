const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); 

const BASE_API_URL = process.env.BASE_URL;
const LANGFLOW_ID = process.env.LANG_FLOW_ID;
const FLOW_ID = process.env.FLOW_ID;
const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;

async function runFlow(message) {
  const apiUrl = `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}`;
  const payload = {
    input_value: message,
    output_type: "chat",
    input_type: "chat",
  };

  const headers = {
    Authorization: `Bearer ${APPLICATION_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(apiUrl, payload, { headers });
    return response.data;
  } catch (error) {
    console.error("Error running flow:", error.response?.data || error.message);
    throw error;
  }
}

app.get("/", (_req, res) => {
  res.send("This is API for Level SuperMind Hackathon by team 'TECHMATE'");
});

app.get("/api/chat", (_req, res) => {
  res.send("API for chatbot is running");
});

app.post("/api/chat", async (req, res) => {

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const chatbotResponse = await runFlow(message);
    res.json(chatbotResponse);
  } catch (error) {
    res.status(500).json({ error: "Error running chatbot flow." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
