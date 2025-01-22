import profilePicture from '../img/profilePicture.png';

function Home() {
    return (
        <>
            <h1>Welcome on my Website</h1>
            <div>
                <img className={"App-logo"} src={profilePicture} alt={"JuliBooli Profile Picture"}/>
            </div>
        </>
    );
}

export default Home;