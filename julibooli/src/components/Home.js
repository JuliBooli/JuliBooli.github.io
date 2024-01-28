import {Link} from "react-router-dom";
import img from '../img/img.png';

function Home() {
    return (
        <div className={"App-header"}>
            <h1>Home</h1>
            <img class={"App-logo"} src={img}/>
        </div>
    );
}

export default Home;