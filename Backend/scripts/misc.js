require("dotenv").config();

// const { createRetrievalText } = require("../services/retrievalTextService");
// const { getEmbedding } = require("../services/embeddingService");
const { getCollection } = require("../services/chromaService");

async function misc() {
    const collection = await getCollection();

    const data = await collection.get();

    console.log(JSON.stringify(data, null, 2));

    process.exit();
}

misc();
