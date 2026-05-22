// scripts/ingestGames.js
require("dotenv").config({
    path: "../.env",
});

const mongoose = require("mongoose");
const Game = require("../model/gameSchema");

const { createRetrievalText } = require("../services/retrievalTextService");
const { getEmbedding } = require("../services/embeddingService");
const { getCollection } = require("../services/chromaService.js");

const testgames = require("./testGames");

async function ingestGames() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);          //connect to MongoDB
        console.log("Connected to MongoDB");

        const games = await Game.find();                        //get all games from MondoDB
        // console.log(games[0]._id.toString());
        // const games = [...testgames];                           //get all test games
        console.log(`Found ${games.length} games`);
        
        
        const collection = await getCollection();               //get Chroma collection
        let count = 0;
        for (const game of games) {
            console.log(`\nProcessing: ${game.name}`);
            console.log("game ID:", game._id.toString());
            
            // Create retrieval text
            const retrievalText = createRetrievalText(game);

            console.log("\nRetrieval Text:");
            console.log(retrievalText);

            // Generate embedding
            const embedding = await getEmbedding(
                retrievalText,
                "RETRIEVAL_DOCUMENT",
            );

            console.log(`Generated embedding (${embedding.length} dimensions)`);

            // Store in Chroma
            await collection.add({
                ids: [game._id.toString()],
                documents: [retrievalText],
                embeddings: [embedding],
                metadatas: [
                    {
                        name: game.name,
                        minPlayers: game.players?.min,
                        maxPlayers: game.players?.max,
                        difficulty: game.difficulty,
                        level: game.level,
                        playtime: game.playtime,
                        mechanics: game.mechanics?.join(", "),
                        mood: game.mood?.join(", "),
                        interactionType: game.interactionType,
                    },
                ],
            });

            count++;
            console.log(`Stored ${game.name} in Chroma. (${count} games processed)`);
        }

        console.log(`\nAll games ingested successfully (${count} games).`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

ingestGames();
