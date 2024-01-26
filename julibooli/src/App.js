import logo from './img/img.png';
import face from './img/img_1.png';

import './App.css';
import Home from "./components/Home";
import {Container, Nav, Navbar} from "react-bootstrap";

function App() {
    return (
        <body>
        <header>
            <Navbar  bg="dark" variant="dark">
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Container style={{padding: "10px", display: "flex", justifyContent: "center",   background: "#22262e"}}>
                        <a href={"https://www.youtube.com/watch?v=99Y1EiIoXis"}>
                            <img src={face} width="40" height="40" className="Small-logo" alt="Face Logo"
                                 style={{padding: 20}}></img>
                        </a>
                        <Nav.Link style={{padding: 20, color: "#3cff05"}} href="/">Home</Nav.Link>
                        <Nav.Link style={{padding: 20, color:"#3cff05"}} href="/features">Features</Nav.Link>
                        <Nav.Link style={{padding: 20, color :"#3cff05"}} href="/pricing">Pricing</Nav.Link>
                    </Container>
                </Nav>
            </Navbar>
        </header>
        <main className="App-header">
            <Home/>
            <img src={logo} className="App-logo" alt="Main Logo"/>
        </main>
        </body>
    );
}

export default App;
