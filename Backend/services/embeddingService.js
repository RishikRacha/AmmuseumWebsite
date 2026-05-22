// services/embeddingService.js

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function getEmbedding(text, taskType = "RETRIEVAL_DOCUMENT") {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",

        contents: text.trim(),

        config: {
            taskType,
            outputDimensionality: 768,
        },
    });

    return response.embeddings[0].values;
}

module.exports = {
    getEmbedding,
};
