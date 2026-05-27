require("dotenv").config({
    path: "../.env",
});

const { getCollection } = require("../services/chromaService");

async function viewChroma() {

  try {

    const collection =
      await getCollection();

    const data =
      await collection.get({

        include: [
          "documents",
          "metadatas",
        //   "embeddings",
        ]
      });

    console.log(JSON.stringify(data, null, 2));
    console.log("LENGTH OF DATA IS",data.documents.length);
    

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
}

viewChroma();
module.exports = {
    viewChroma,
};