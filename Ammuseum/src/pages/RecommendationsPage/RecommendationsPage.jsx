import React, { useEffect, useState } from "react";
import "./RecommendationsPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GameDetails from "../GameDetails/GameDetails";
import playersIcon from "../../assets/cliparts/playerspixel.png"
import PlayerTag from "../../components/PlayerTag/PlayerTag";


function RecommendationsPage() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState(2);
  const [loading, setLoading] = useState(false);
  const [gameOpened, setGameOpened] = useState(-1);
  const [games, setGames] = useState([]);

  useEffect(() => {
  if (gameOpened >= 0) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [gameOpened]);

  let game;

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const clickHandler = (key) => {
    console.log(key);
    
    setGameOpened(key);
  }

  const handleRecommend = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
        console.log({query, players});
        
      const res = await axios.post(`${apiUrl}/recommendations/get-recommendations`, {
        query,
        players: Number(players),
      });

      setGames(res.data || []);
      console.log(res.data);
      
    } catch (err) {
      console.log("Recommendation error:", err);
      alert("Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RecPageContainer">

      <h2>Find Your Perfect Game 🎲</h2>

      <p className="subText">
        Tell us your vibe and group size — we’ll handle the rest.
      </p>

      {/* INPUTS */}
      <div className="inputSection">

        {/* QUERY */}
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. fun, chaotic party game, not too complex..."
        />

        {/* PLAYERS */}
        <div className="playerInput">
        <label>
            Number of Players: <span className="playerValue">{players < 15 ? players : "15+"}</span>
        </label>

        <input
            type="range"
            min="1"
            max="15"
            value={players}
            onChange={(e) => setPlayers(Number(e.target.value))}
            style={{
                background: `linear-gradient(to right,
                var(--logo-yellow) 0%,
                var(--logo-yellow) ${(players - 1) * (100 / 14)}%,
                rgba(255,255,255,0.1) ${(players - 1) * (100 / 14)}%,
                rgba(255,255,255,0.1) 100%
                )`
            }}
        />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleRecommend}
          disabled={loading || !query.trim() || !players}
        >
          {loading ? "Finding games..." : "Get Recommendations"}
        </button>
      </div>

      {/* RESULTS */}
      <div className="resultsSection">

        {games.length === 0 && !loading && (
          <p className="emptyState">
            No recommendations yet. Try describing your vibe.
          </p>
        )}

        <div className="gamesGrid">
          {games.map((game, key) => (
            <div key={game._id} className="gameCard" onClick={() => {clickHandler(key)}}>
              <img src={game.image?.[0]} alt={game.name} />
              <h3>{game.name}</h3>

              <p className="gameMeta">
                {game.players.min}-{game.players.max} players
              </p>

              <p className="gameDesc">
                {game.shortDescription || game.description}
              </p>
            </div>
          ))}
        </div>

      </div>

    {/* GAME DETAILS */}

    {gameOpened >= 0 && (
        <div className="gameDetailsModal">
            <div className='gameDetailsContainer modalBox'>
                <div className="closeModalBtn" onClick={() => {setGameOpened(-1); console.log('click');}}>✕</div>

                <div className="carouselContainer">
                        {games[gameOpened].image.map((image, index) => (
                            <div key={index} className="carouselContainerIn">
                                <img src={image} className="carouselImg" alt={"Picture of " + games[gameOpened].name + " " + (index+1)}/>
                            </div>
                        ))}
                </div>

            <div className='gameDetails'>
                <h2>{games[gameOpened].name}</h2>

                <h4><img className="playersIcon nodrag" src={playersIcon}  /> : {games[gameOpened].players.min} - {games[gameOpened].players.max} Players | Playtime: {games[gameOpened]?.playtime}</h4>
                
                <p>{games[gameOpened].description}</p>

                <p>This game has: {game?.mechanics?.join(", ")}.</p>
                
                <h4>Strategy level: {games[gameOpened].level}</h4>

                <h4>BGG Weight: {games[gameOpened].difficulty} ★</h4>

                <p><b>Mood:</b> {games[gameOpened].mood?.join(", ")}</p>

                <b>Ideal for:</b> <br />
                {games[gameOpened].idealFor?.map((tag, key) => (
                    <PlayerTag key={key} player={{username: tag}}/>
                ))}


            </div>
        </div>
    </div>
    )}
    </div>
  );
}

export default RecommendationsPage;