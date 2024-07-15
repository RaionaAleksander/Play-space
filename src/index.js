import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Other/Contact";
import NoPage from "./pages/NoPage";
import Future from "./pages/Other/Future";
import Games from './pages/Games';
import ButtonClicker from './pages/Games/ButtonClicker';
import HeroClicker from './pages/Games/HeroClicker';
import TicTacToe from './pages/Games/TicTacToe';
import Snake from './pages/Games/Snake';
import AboutUs from './pages/Other/AboutUs';

import SideNavBarsLayout from './components/SideNavBarsLayout';
import ScrollToTop from './components/ScrollToTop';

import './styles/App.css';

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<SideNavBarsLayout />}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="future" element={<Future />} />
                    <Route path="games/" element={<Games />}/>
                    <Route path="games/button_clicker" element={<ButtonClicker />} />
                    <Route path="games/hero_clicker" element={<HeroClicker />} />
                    <Route path="games/tic-tac-toe" element={<TicTacToe />} />
                    <Route path="games/snake" element={<Snake />} />
                    <Route path="about_us" element={<AboutUs />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
