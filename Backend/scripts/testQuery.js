require("dotenv").config({
    path: "../.env",
});

const { getCollection } = require("../services/chromaService");

const { getEmbedding } = require("../services/embeddingService");

async function testQuery() {

  try {

    const collection = await getCollection();

    const playersCount = 9;

    const userQuery = 
    "intense seriopus secretive game";

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