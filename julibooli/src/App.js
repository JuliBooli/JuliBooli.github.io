import logo from './img/img.png';
import face from './img/img_1.png';
import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import { Route, Routes } from 'react-router-dom';
import Features from './components/Features';
import Home from './components/Home';
import Pricing from "./components/Pricing";

function App() {
    return (
        <>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Container style={{ padding: '10px', display: 'flex', justifyContent: 'center', background: '#22262e' }}>
                            <a href={'https://www.youtube.com/watch?v=99Y1EiIoXis'}>
                                <img src={face} width="40" height="40" className="Small-logo" alt="Face Logo" style={{ padding: 20 }} />
                            </a>
                            <Nav.Link style={{ padding: 20, color: '#3cff05' }} href="/">
                                Home
                            </Nav.Link>
                            <Nav.Link style={{ padding: 20, color: '#3cff05' }} href="/features">
                                Features
                            </Nav.Link>
                            <Nav.Link style={{ padding: 20, color: '#3cff05' }} href="/pricing">
                                Pricing
                            </Nav.Link>
                        </Container>
                    </Nav>
                </Navbar>
            </header>
            <div className="App-header">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
