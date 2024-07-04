import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import "./styles/global.css";
import CreateEdit from "./components/CreateEditPost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/login" Component={LoginForm} />
        <Route exact path="/register" Component={RegisterForm} />
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/create" Component={CreateEdit} />
        <Route exact path="/edit-post/:post_id" Component={CreateEdit} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
