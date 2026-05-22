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
        <img src={logo} draggable={false} />

        <form onSubmit={handleSubmit} className="allC">
          <div className="floatingInputAuth">
            <input
              type="text"
              name="username"
              className="authInput"
              placeholder=" "
              value={form.username}
              onChange={handleChange}
              autoCapitalize="none"
              required
            />
            <label className="formInputLabel">Username</label>
          </div>

          {!isLogin && (
            <>
              <div className="floatingInputAuth">
                <input
                  type="text"
                  name="name"
                  className="authInput"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  required
                  />
                  <label className="formInputLabel">Name (hidden to other users)</label>
              </div>

              <div className="floatingInputAuth">
                <input
                  type="text"
                  name="whatsapp"
                  className="authInput"
                  placeholder=" "
                  value={form.whatsapp}
                  onChange={handleChange}
                  required
                  />
                  <label className="formInputLabel">Whatsapp Number</label>
              </div>
            </>
          )}

          <div className="floatingInputAuth">
            <input
              type="password"
              name="password"
              className="authInput"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
            />
            <label className="formInputLabel">Password</label>
          </div>

          {!isLogin && (
            <div className="floatingInputAuth">
              <input
                type="password"
                name="confirmPassword"
                className="authInput"
                placeholder=" "
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <label className="formInputLabel">Confirm Password</label>
            </div>
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