// services/retrievalTextService.js

function createRetrievalText(game) {
  return `
${game.name}

Core Experience:
${game.semanticTags?.join(", ") || ""}

Mood:
${game.mood?.join(", ") || ""}

Gameplay:
${game.mechanics?.join(", ") || ""}

Theme:
${game.tags?.join(", ") || ""}

Audience:
${game.audience?.join(", ") || ""}

Ideal for:
${game.idealFor?.join(", ") || ""}

Players:
${game.players?.min || "?"} to ${game.players?.max || "?"}

Playtime:
${game.playtime || ""}

Difficulty:
${game.difficulty || ""}
`.trim();
}

module.exports = {
  createRetrievalText,
};