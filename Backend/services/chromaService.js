// services/chromaService.js
require("dotenv").config();

const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  host: process.env.CHROMA_HOST,
  port: process.env.CHROMA_PORT,
});

let collection;

async function getCollection() {
  if (!collection) {
    collection =
      await client.getOrCreateCollection({
        name: "boardgames",

        embeddingFunction: null,
      });
  }

  return collection;
}

module.exports = {
  getCollection,
};