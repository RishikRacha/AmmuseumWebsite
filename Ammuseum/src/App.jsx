import { useState } from "react";

import "./App.css";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import GameDetails from "./pages/GameDetails/GameDetails";

import BoardGamesPage from "./pages/BoardGamesPage/BoardGamesPage";
import Events from "./pages/Events/Events";
import About from "./pages/About/About";

function App() {
    const [count, setCount] = useState(0);

    return <div>
        <Nav />
        <Routes>
            <Route path='*' element={<Home />} />
            <Route path='game-details' element={<GameDetails />}/>
            <Route path='board-games' element={<BoardGamesPage />}/>
            <Route path='events' element={<Events />}/> 
            <Route path='about' element={<About />}/> 
        </Routes>
    </div>
}

export default App;
