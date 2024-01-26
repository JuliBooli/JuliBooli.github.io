import logo from './img/img.png';
import './App.css';
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <header className={"App-header"}>
                <Home/>
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
        </div>
    );
}

export default App;
