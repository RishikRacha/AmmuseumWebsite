import React, { useEffect, useState } from "react";
import axios from "axios"; 
import api from "../../api"
import { Link, useNavigate, useParams } from "react-router-dom";
import './EventPage.css'

import { useSelector } from "react-redux";                              //redux stuff
import { useDispatch } from "react-redux";                              //redux stuff
import {jwtDecode} from 'jwt-decode';                                   //redux stuff

import PlayerTag from "../../components/PlayerTag/PlayerTag";

function EventPage() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    const isLoggedIn = useSelector((store) => store.isLoggedIn);        //redux stuff
    const user = useSelector((store) => store.user);                    //redux stuff

    const fetchEvents = () => {
        api
            .get(`/events/${id}`)
            .then((res) => {
                setEvent(res.data);
            })
            .catch(() => {
                console.log("Error fetching event");
            });
    }

    useEffect(fetchEvents, [id]);

    const handleRegister = async () => { try{
        const data = {eventId: id}
        setLoading(true);
        await api.post(`/events/register`, data, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })

        // add user locally
        setEvent((prev) => ({
            ...prev,
            participants: [
            ...prev.participants,
            {
                userId: user.userId,
                name: user.name,
                username: user.username,
            },
            ],
        }));
        setLoading(false);
        fetchEvents();

    } catch(err) {
        alert("registration failed :(")
    }}

    const handleUnregister = async () => {
        setLoading(true);
        await axios.post(
            "/events/unregister",
            { eventId: event._id },
            {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            }
        );

        // remove user locally
        setEvent((prev) => ({
            ...prev,
            participants: prev.participants.filter(
            (p) => p.userId?.toString() !== user.userId
            ),
        }));
        setLoading(false);
        fetchEvents();

    };

    if (!event) return <div style={{margin: '120px'}}>
        <p>Loading...</p>
        <a onClick={() => {navigate('/')}}>Go back if not loading</a>
    </div>;

    const isRegistered = event?.participants?.some(
        (p) => p.userId === user?.userId
    );

    return (
        <div className="eventDetailsPageContainer">
            <a className="backLink" onClick={() => navigate('/events')}> &lt;Back to Events</a>
            {/* <h3>Event:</h3> */}
            <div className="eventHero">
                <div className="dateBadge">
                    <div className="dateDay">
                        {event.date}
                    </div>
                    <div >
                        {event.time}
                    </div>
                </div>
                <div>
                    <h1>{event.name}</h1>
                    <div className="venueChip">📍{event.venue}</div>
                </div>
            </div>

            <p style={{whiteSpace: 'pre-line'}}>
                {event.description}
            </p>
            <br />
            {!isLoggedIn ? 
                <h4>Please <Link to={`/login?redirect=/event/${id}`}>login</Link> to register for event</h4> 
                :
                isRegistered ?
                <button className="eventRegistrationBtn" onClick={handleUnregister} disabled={loading}>{loading ? "Please wait..." : "Unregister"}</button>
                :
                <button className="eventRegistrationBtn" onClick={handleRegister} disabled={loading}>{loading ? "Please wait..." : "Register"}</button>
                
            }

            {isRegistered && (
                <span style={{ color: "var(--logo-yellow)", margin: "10px" }}>
                ✓ You're going
            </span>
            )}
            <p className="participantCount">{event.participants.length} participants</p>

            <div className="participantsList">
                {event.participants.map((player)=> (    //Display usernames of participants
                    <PlayerTag key={player.userId} player={player}/>
                ))}
            </div>

        </div>
    );
}

export default EventPage;
