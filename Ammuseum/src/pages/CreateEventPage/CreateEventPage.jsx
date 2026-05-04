import React, { useRef, useState } from "react";
import axios from "axios";
import api from "../../api"
import './CreateEventPage.css'
import { useNavigate } from "react-router-dom";


function CreateEventPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    venue: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if(e.target.name === "description") {
      const el = textareaRef.current;
      el.style.height = "auto";         //reset
      el.style.height = el.scrollHeight + "px"; //grow
    }
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();

    // trim all fields
    const trimmedForm = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.trim()])
    );

    try {
      await api.post(`/events/create`, form, {
        headers:{
          Authorization: localStorage.getItem("token")
        }
      });

      alert("Event created successfully!");

      // reset form
      setForm({
        name: "",
        venue: "",
        date: "",
        time: "",
        description: "",
      });
      navigate('/events');

    } catch (err) {
      alert(err.response?.data?.message || "Error creating event");
    }
  };

  return (
    <div style={{ padding: "20px", display:'flex', flexDirection:'column', alignItems:'center', marginTop: '120px'}}>
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit} className="createEventForm" style={{}}>
        
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="date"
          placeholder="Date (e.g. Sunday, 30th Feb)"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="time"
          placeholder="Time (e.g. 6 PM)"
          value={form.time}
          onChange={handleChange}
          required
        />

        <textarea
          ref={textareaRef}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          required
          style={{resize:'none'}}
        />

        <button type="submit" className="eventRegistrationBtn">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage;