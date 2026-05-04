import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api"
import './Events.css'
import { useNavigate } from "react-router-dom";

function Events() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api
            .get("/events/all")
            .then((res) => {
                setEvents(res.data);
            })
            .catch(() => {
                console.log("Error fetching events");
            });
    }, []);

    return (
        <div className="eventsContainer">
            <h1>All Events</h1>

            <div className="eventsList">
                {events.map((event) => (
                    <div 
                        key={event._id} 
                        className="eventCard"
                        onClick={() => navigate(`/event/${event._id}`)}
                    >
                        <h3 className="eventTitle">{event.name}</h3>
                        <p>📍 {event.venue}</p>
                        <p>{event.date} {event.time}</p>
                        <h3>registered players: {event.participants.length}</h3>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;
