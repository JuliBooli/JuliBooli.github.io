import face from './img/img_1.png';
import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Features from "./components/Features";
import Projects from "./components/Projects";

function App() {
    return (
        <>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Container
                            style={{padding: '10px', display: 'flex', justifyContent: 'center', background: '#22262e'}}>
                            <a href={'https://www.youtube.com/watch?v=99Y1EiIoXis'}>
                                <img src={face} width="40" height="40" className="Small-logo" alt="Face Logo"
                                     style={{padding: 20}}/>
                            </a>
                            <NavLink className={"NavLink"} to={"/"}>
                                Home
                            </NavLink>
                            <NavLink className={"NavLink"} to={"/features"}>
                                Features
                            </NavLink>
                            <NavLink className={"NavLink"} to={"/projects"}>
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
