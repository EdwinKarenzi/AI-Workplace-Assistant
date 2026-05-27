const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));

app.post("/analyze", async (req, res) => {
  try {

    const { text } = req.body;

    const prompt = `
You are an AI workplace incident assistant.

Analyze the incident below and answer in Swedish.

Return:
1. Sammanfattning
2. Risknivå
3. Incidentrapport
4. Rekommenderade åtgärder
5. Checklista

Incident:
${text}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    const aiText =
      data.choices?.[0]?.message?.content ||
      "No AI response.";

    res.json({
      response: aiText
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI request failed."
    });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
}); 