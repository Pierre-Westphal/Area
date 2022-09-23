import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/home_page';
import LoginPage from './components/login';
import AboutPage from './components/about';
import RoutesPage from './components/routes';
import EpitechPage from './components/epitech';
import CryptoPage from './components/crypto';
import SpotifyPage from './components/spotify';
import WeatherPage from './components/weather';
import CoffeePage from './components/coffee';
import Github from './components/github';
import ReactionPage from './components/reaction';
import ApkPage from './components/apk';
import React from 'react';
import useToken from './components/useToken';
import './App.css';

function App() {
  const { token, setToken } = useToken('token');

  if (token == undefined) return <LoginPage setToken={setToken} />

  return (
    <BrowserRouter>
      <Navbar />
      <br/><br/>
      <Routes>
        <Route exact path="/about" element={<AboutPage/>} />
        <Route exact path="/routes" element={<RoutesPage/>} />
        <Route exact path="/apk" element={<ApkPage/>} />
        <Route exact path="/epitech" element={<EpitechPage/>} />
        <Route exact path="/github" element={<Github/>} />
        <Route exact path="/crypto" element={<CryptoPage/>} />
        <Route exact path="/spotify" element={<SpotifyPage/>} />
        <Route exact path="/reaction" element={<ReactionPage/>} />
        <Route exact path="/weather" element={<WeatherPage/>} />
        <Route exact path="/coffee" element={<CoffeePage/>} />
        <Route path='*' element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
