import React, { useState } from "react";
import "./LoginPage.css";
import logo from "../../assets/General/AmmuseumLogoPadded.png";
import axios from 'axios';
import api from "../../api"
import {Link, useNavigate, useSearchParams} from "react-router-dom";

import { useSelector } from "react-redux";                              //redux stuff
import { useDispatch } from "react-redux";                              //redux stuff
import {jwtDecode} from 'jwt-decode';                                   //redux stuff




function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    username: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });

  const isLoggedIn = useSelector((store) => store.isLoggedIn);        //redux stuff
  const user = useSelector((store) => store.user);                    //redux stuff
  const dispatch = useDispatch();



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (isLogin) {
            //LOGIN Logic
            console.log("Login Data:", {
                username: form.username,
                password: form.password,
            });

            const res = await api.post('/auth/login', {
                username: form.username,
                password: form.password,
            });
            
            localStorage.setItem("token", res.data.token);  //store token
            
            const decoded = jwtDecode(res.data.token);      //decode Token

            dispatch({                                      //update redux
                type: "LOGIN",
                payload: decoded,
            })
            
            const redirect = searchParams.get("redirect");
            navigate(redirect || '/');
        } 
        else {
            //REGISTER Logic
            console.log("Register Data:", form);
            if (form.password !== form.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            await api.post('/auth/register', {
                name: form.name,
                username: form.username.toLowerCase(),
                whatsapp: form.whatsapp,
                password: form.password,
            });

            alert("Registered successfully! Please login.");
            setIsLogin(true);
        }

        console.log(form);
    } catch (err) {
        alert(err.response?.data?.message)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch({type: "LOGOUT"});

    navigate("/")
  };

    return (
    !isLoggedIn ? (
    <div className="authContainer">
      <div className="authCard">
        {/* <h2>{isLogin ? "Login" : "Register"}</h2> */}
        <img src={logo} draggable={false} onClick={() => navigate('/')}/>

        <form onSubmit={handleSubmit} className="allC">

          <input
            type="text"
            name="username"
                className="authInput"

            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            autoCapitalize="none"
            required
          />

          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                className="authInput"
                placeholder="Name (Hidden to other users)"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="whatsapp"
                className="authInput"
                placeholder="WhatsApp Number"
                value={form.whatsapp}
                onChange={handleChange}
                required
              />
            </>
          )}


          <input
            type="password"
            name="password"
            className="authInput"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              className="authInput"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="submitBtn" >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggleText">
          {isLogin ? "New here?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  ) : (
    <div className="authContainer">
        <div className="authCard">
            <h2>Hi {user?.name}</h2>

            <button type="submit" className="submitBtn" onClick={handleLogout}>
                Log out of {user.username}
            </button>

        </div> 
    </div>
  ));
}

export default LoginPage;