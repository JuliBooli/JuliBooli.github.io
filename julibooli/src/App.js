import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Features from "./components/Features";
import Projects from "./components/Projects";
import profilePicture from './img/profilePicture.png';

function App() {

    return (
        <>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Nav variant="tabs" defaultActiveKey="/">
                        <Container className={"container"}>
                            <a href={'/'}>
                                <img src={profilePicture} width="40" height="40" className="Small-logo" alt="Face Logo"
                                     style={{padding: 20}}/>
                            </a>
                            <NavLink className={"navigationLink"} to={"/features"}>
                                Features
                            </NavLink>
                            <NavLink className={"navigationLink"} to={"/projects"}>
                                Projects
                            </NavLink>
                        </Container>
                    </Nav>
                </Navbar>
            </header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/features" element={<Features/>}/>
                <Route path="/projects" element={<Projects/>}/>
            </Routes>
        </>
    );
}

export default App;
