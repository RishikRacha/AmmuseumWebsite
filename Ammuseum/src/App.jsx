import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";


import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import GameDetails from "./pages/GameDetails/GameDetails";
import LoginPage from "./pages/LoginPage/LoginPage"

import BoardGamesPage from "./pages/BoardGamesPage/BoardGamesPage";
import Events from "./pages/Events/Events";
import About from "./pages/About/About";
import EventPage from "./pages/EventPage/EventPage";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";

function App() {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((store) => store.isLoggedIn);        //redux stuff
    const user = useSelector((store) => store.user);                    //redux stuff


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);

                dispatch({
                    type:"LOGIN",
                    payload: decoded,
                });
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    return <div >
        <Nav />
        <Routes>
            <Route path='*' element={<Home />} />
            <Route path='game-details' element={<GameDetails />}/>
            <Route path='board-games' element={<BoardGamesPage />}/>
            <Route path='events' element={<Events />}/> 
            <Route path='/event/:id' element={<EventPage />}/> 
            <Route path='about' element={<About />}/> 
            <Route path='login' element={<LoginPage />}/> 
            {/* <Route path='create-event' element={<CreateEventPage />}/>  */}
            <Route path='create-event' element={user?.username === 'admin' ? <CreateEventPage /> : (<Home />)}/> 

        </Routes>
    </div>
}

export default App;
