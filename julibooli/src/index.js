import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter   as Router, Route, Routes } from 'react-router-dom';
import Features from './components/Features';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/features" element={<Features />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);