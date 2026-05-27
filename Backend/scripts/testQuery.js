require("dotenv").config({
    path: "../.env",
});
const fs = require("fs");

const { getCollection } = require("../services/chromaService");

const { getEmbedding } = require("../services/embeddingService");

async function testQuery() {

  try {

    const collection = await getCollection();

    const playersCount = 9;

    const userQuery = 
    "intense serious secretive game";

    console.log("\nQUERY:");
    console.log(userQuery);

    const queryEmbedding = await getEmbedding(
        userQuery,
        "RETRIEVAL_QUERY"
    );

    const results = await collection.query({

        queryEmbeddings: [queryEmbedding],

        nResults: 5,

        include: [
          "documents",
          "metadatas",
          "distances"
        ],

        where: { $and: [
              { minPlayers: { $lte: playersCount }},
              { maxPlayers: { $gte: playersCount }}
        ] },
    });

    const formattedResults =
      results.ids[0].map((id, index) => ({

        id,

        distance: results.distances[0][index],

        metadata: results.metadatas[0][index],

        document: results.documents[0][index],

      }));

    // fs.writeFile("output.txt", formatted)

  //   {
  //   "id": "68767de5e22a3beb47a68757",
  //   "distance": 0.2141007,
  //   "metadata": {
  //     "maxPlayers": 10,
  //     "interactionType": "social interaction",
  //     "mechanics": "voting, hidden roles",
  //     "mood": "tense, chaotic, competitive",
  //     "playtime": "45 mins",
  //     "level": "Medium",
  //     "minPlayers": 5,
  //     "difficulty": 2.5,
  //     "name": "Secret Hitler"
  //   },
  //   "document": "Secret Hitler\n\nCore Experience:\nmind games, table banter, high tension, social deception, lying to friends\n\nMood:\ntense, chaotic, competitive\n\nGameplay:\nvoting, hidden roles\n\nTheme:\nparty game, historical, social deduction\n\nAudience:\nparty groups, casual gamers\n\nIdeal for:\nlarge gatherings, party nights, late-night groups\n\nPlayers:\n5 to 10\n\nPlaytime:\n45 mins\n\nDifficulty:\n2.5"
  // }

    console.log("\nTOP RESULTS:\n");

    console.log(
      JSON.stringify(
        formattedResults,
        null,
        2
      )
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
}

testQuery();