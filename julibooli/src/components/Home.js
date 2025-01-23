import React, { useState, useEffect } from "react";

function Home() {

    const [styleIndex, setStyleIndex] = useState(0);

    const styles = [
        { border: "5px solid red", borderRadius: "0" },
        { border: "5px dashed blue", borderRadius: "50%" },
        { border: "5px dotted green", boxShadow: "0 0 10px green" },
        { border: "5px double orange", transform: "rotate(10deg)" },
        { border: "8px inset pink", transform: "scale(1.1)" },
        { border: "10px outset cyan", filter: "brightness(1.2)" },
        { border: "6px ridge yellow", transform: "rotate(-10deg)" },
        { border: "4px solid #ff00ff", backgroundColor: "#ffcccc" },
        { border: "5px dotted #00ffcc", boxShadow: "0 0 15px #00ffcc" },
        { border: "6px double brown", transform: "skew(5deg, 5deg)" },
        { border: "7px groove lime", filter: "grayscale(100%)" },
        { border: "5px dashed navy", opacity: "0.5" },
        { border: "8px ridge black", transform: "scale(0.9)" },
        { border: "5px outset gold", filter: "sepia(1)" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStyleIndex((prevIndex) => (prevIndex + 1) % styles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [styles.length]);

    return (
        <>
            <h1>Welcome on my Website</h1>
            <div>
                <img className={"App-logo"} src={"https://avatars.githubusercontent.com/u/118832930?s=400&v=4"} alt={"JuliBooli Profile Picture"} style={styles[styleIndex]} />
            </div>
        </>
    );
}

export default Home;