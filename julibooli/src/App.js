import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Features from "./components/Features";
import Projects from "./components/Projects";
import ThreeJS from "./components/ThreeJS";

function App() {

    return (
        <>
            {window.location.pathname !== "/projects/game-of-life" && (
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Nav variant="tabs" defaultActiveKey="/" className={"nav"}>
                            <Container className={"container"}>
                            <a href={'/'}>
                                <img src={"https://avatars.githubusercontent.com/u/118832930?s=400&v=4"} width="40"
                                     height="40" className="smallLogo" alt="Face Logo"/>
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
            )}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/features" element={<Features/>}/>
                <Route path={"/projects"}>
                    <Route path="/projects/" element={<Projects/>}/>
                    <Route path={"/projects/game-of-life"} element={<ThreeJS/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
