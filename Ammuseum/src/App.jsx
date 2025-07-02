import { useState } from "react";

import "./App.css";
import Nav from "./components/Nav/Nav";
import Carousel from "./components/Carousel/Carousel";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import GameDetails from "./pages/GameDetails/GameDetails";
import HomeGamesList from "./components/HomeGamesList/HomeGamesList";
import BoardGamesPage from "./pages/BoardGamesPage/BoardGamesPage";

function App() {
    const [count, setCount] = useState(0);

    return <div>
        <Routes>
            <Route path='*' element={<Home />} />
            <Route path='game-details' element={<GameDetails />}/>
            <Route path='board-games' element={<BoardGamesPage />}/>
        </Routes>
    </div>
}

export default App;
