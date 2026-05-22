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
    location: "",
    day: "",
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

  const isFormValid =
  form.name.trim() &&
  form.venue.trim() &&
  form.day.trim() &&
  form.date.trim() &&
  form.time.trim() &&
  form.description.trim();

  return (
    <div style={{ padding: "20px", display:'flex', flexDirection:'column', alignItems:'center', marginTop: '120px'}}>
      <h1>Create Event</h1>


      <form onSubmit={handleSubmit} className="createEventForm" style={{}}>
      <div className="floatingInput"> 
        <input
          type="text"
          name="name"
          placeholder=" "
          value={form.name}
          onChange={handleChange}
          required
        />
        <label className="formInputLabel">Event Name *</label>
        </div>

        <div className="floatingInput"> 
        <input
          type="text"
          name="venue"
          placeholder=" "
          value={form.venue}
          onChange={handleChange}
          required
        />
        <label className="formInputLabel">Venue *</label>
        </div>

        <div className="floatingInput"> 
        <input
          type="text"
          name="location"
          placeholder=" "
          value={form.location}
          onChange={handleChange}
          required
        />
        <label className="formInputLabel">Maps link to venue</label>
        </div>

        <div className="floatingInput"> 
        <input
          type="text"
          name="day"
          placeholder=" "
          value={form.day}
          onChange={handleChange}
          required
        />
        <label className="formInputLabel">Day of the Week *</label>
        </div>

        <div className="floatingInput"> 
        <input
          type="text"
          name="date"
          placeholder=" "
          value={form.date}
          onChange={handleChange}
          required
        />
        <label className="formInputLabel">Date *</label>
        </div>


        <div className="floatingInput"> 
        <input
          type="text"
          name="time"
          placeholder=" "
          value={form.time}
          onChange={handleChange}
          required
        />
        <label className="formInputLabel">Time *</label>
        </div>

        <div className="floatingInput">
        <textarea
          ref={textareaRef}
          name="description"
          placeholder=" "
          value={form.description}
          onChange={handleChange}
          rows={5}
          required
          style={{resize:'none'}}
          />
        <label className="formInputLabel">Description *</label>
          </div>

        <button type="submit" className="eventRegistrationBtn createEventBtn" disabled={!isFormValid}>Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage;