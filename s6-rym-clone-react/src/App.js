import logo from './logo.svg';
import './App.css';
import './style/rym.css';
import ArtistPage from "./pages/artist";
import React from "react";
import AlbumPage from "./pages/album";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserPage from "./pages/user";
import Header from "./components/header";
import LoginPage from "./pages/login";

function App() {
  return (
      <Router>
          <Header></Header>
          <div className={"wrapper"} >
              <Routes>
                <Route path="/album/:id" element={<AlbumPage/>}/>
                <Route path="/artist/:id" element={<ArtistPage/>}/>
                <Route path="/user/:username" element={<UserPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
