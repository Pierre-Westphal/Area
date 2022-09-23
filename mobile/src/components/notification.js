import React from 'react';
import ApiCalls from "./apiCalls";
import '../App.css';

function Notification() {
    const getData = async () => {
        const res = await ApiCalls.getData('/reactions');
        console.log(res);
        if (res.status_code >= 100) return
        return res.text;
    }

    const [data, setData] = React.useState(null);
    const [spotify, setSpotify] = React.useState(null);
    const [github, setGithub] = React.useState(null);
    const [epitech, setEpitech] = React.useState(null);
    const [weather, setWeather] = React.useState(null);
    const [coffee, setCoffee] = React.useState(null);
    const [crypto, setCrypto] = React.useState(null);

    const spotifyButton = () => {
        setSpotify(!spotify);
        data.reactions[0].status = !spotify;
        setData(data);
    };

    const githubButton = () => {
        setGithub(!github);
        data.reactions[1].status = !github;
        setData(data);
    };

    const epitechButton = () => {
        setEpitech(!epitech);
        data.reactions[2].status = !epitech;
        setData(data);
    };

    const weatherButton = () => {
        setWeather(!weather);
        data.reactions[3].status = !weather;
        setData(data);
    };

    const coffeeButton = () => {
        setCoffee(!coffee);
        data.reactions[4].status = !coffee;
        setData(data);
    };

    const cryptoButton = () => {
        setCrypto(!crypto);
        data.reactions[5].status = !crypto;
        setData(data);
    };

    const saveButton = async () => {
        await ApiCalls.postData('/reactions', data);
        window.location.reload();
    };

    if (!data) {
        getData().then(res => {setData(res)});
        return <div>Loading...</div>;
    } else if (spotify == null || github == null || epitech == null || weather == null || coffee == null || crypto == null) {
        setSpotify(data.reactions[0].status)
        setGithub(data.reactions[1].status)
        setEpitech(data.reactions[2].status)
        setWeather(data.reactions[3].status)
        setCoffee(data.reactions[4].status)
        setCrypto(data.reactions[5].status)
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1>Notifications</h1>
                <button className={spotify ? 'Button' : 'Button-red'} onClick={spotifyButton}>Spotify</button>
                <br/>
                <button className={github ? 'Button' : 'Button-red'} onClick={githubButton}>Github</button>
                <br/>
                <button className={epitech ? 'Button' : 'Button-red'} onClick={epitechButton}>Epitech</button>
                <br/>
                <button className={weather ? 'Button' : 'Button-red'} onClick={weatherButton}>Weather</button>
                <br/>
                <button className={coffee ? 'Button' : 'Button-red'} onClick={coffeeButton}>Coffee</button>
                <br/>
                <button className={crypto ? 'Button' : 'Button-red'} onClick={cryptoButton}>Currencies</button>
                <br/>
                <button className='Button' onClick={saveButton}>Save</button>
            </div>
        );
    }
}

export default Notification;
