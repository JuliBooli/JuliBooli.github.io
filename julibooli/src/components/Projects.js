import { Link } from 'react-router-dom';
import './css/projects.css';

function Projects() {
    return (
        <>
            <h1>Projects</h1>
            <div className="projectLink">
                <a
                    className="link"
                    href="https://github.com/JuliBooli/box-clicker"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    box-clicker
                </a>
            </div>

            <div className="projectLink">
                <a
                    className="link"
                    href="https://github.com/JuliBooli/three-js-fun"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Three JS
                </a>
                <Link to="/projects/game-of-life">Check out Game of Life</Link>
                <div>
                    <h3>Game of Life</h3>
                    <img src="/assets/game-of-life.png" alt="Game of Life preview"/>
                </div>
            </div>
        </>
    );
}

export default Projects;