const Game = require("../model/gameSchema");

const { getCollection } = require("./chromaService");

const { getEmbedding } = require("./embeddingService");

async function recommendGames({ query, players }) {
    // console.log('recommend endpoint hit');
    
    // 1. embedding
    const queryEmbedding = await getEmbedding(query, "RETRIEVAL_QUERY");

    // 2. get vector DB
    const collection = await getCollection();

    // 3. semantic search + filter
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],

        nResults: 5,

        where: {
            $and: [
                {minPlayers: {$lte: players}},
                {maxPlayers: {$gte: players}},
            ]
        }
    });

    const ids = results.ids[0];

    // 4. fetch from MongoDB
    const games = await Game.find({
        _id: { $in: ids },
    });

    // 5. preserve ranking
    const orderedGames = ids.map((id) =>
        games.find((g) => g._id.toString() === id),
    );

    // console.log("\nTOP RESULTS:\n");
    // console.log(JSON.stringify(orderedGames, null, 2));

    return orderedGames;
}

module.exports = {
    recommendGames,
};
