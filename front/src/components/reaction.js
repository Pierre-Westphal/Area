import React from 'react';
import ApiCalls from "./apiCalls";
import '../App.css';

function Reaction() {
    const getData = async () => {
        const res = await ApiCalls.getData('/reactions');
        if (res.status_code >= 100) return
        return res.text;
    }

    const [data, setData] = React.useState(undefined);
    const [ref, setRef] = React.useState(false);
    const [webhook, setWebhook] = React.useState(undefined);
    const [savedwebhook, setSavedwebhook] = React.useState(true);
    const [mode, setMode] = React.useState(undefined);
    const [spotify1, setSpotify1] = React.useState(undefined);
    const [github1, setGithub1] = React.useState(undefined);
    const [github2, setGithub2] = React.useState(undefined);
    const [github3, setGithub3] = React.useState(undefined);
    const [epitech1, setEpitech1] = React.useState(undefined);
    const [weather1, setWeather1] = React.useState(undefined);
    const [weather2, setWeather2] = React.useState(undefined);
    const [coffee1, setCoffee1] = React.useState(undefined);
    const [coffee2, setCoffee2] = React.useState(undefined);
    const [coffee3, setCoffee3] = React.useState(undefined);
    const [crypto1, setCrypto1] = React.useState(undefined);
    const [crypto2, setCrypto2] = React.useState(undefined);
    const [crypto3, setCrypto3] = React.useState(undefined);
    const [crypto4, setCrypto4] = React.useState(undefined);
    const [crypto5, setCrypto5] = React.useState(undefined);

    const spotifyButton1 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('spotify_status_follower')].status = !spotify1;
        setSpotify1(!spotify1);
        setData(data);
        setRef(true);
    };


    const githubButton1 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('github_status_follower')].status = !github1;
        setGithub1(!github1);
        setData(data);
        setRef(true);
    };
    const githubButton2 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('github_status_following')].status = !github2;
        setGithub2(!github2);
        setData(data);
        setRef(true);
    };
    const githubButton3 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('github_status_repo')].status = !github3;
        setGithub3(!github3);
        setData(data);
        setRef(true);
    };


    const epitechButton1 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('epitech_status_notification')].status = !epitech1;
        setEpitech1(!epitech1);
        setData(data);
        setRef(true);
    };


    const weatherButton1 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('weather_status_temperature')].status = !weather1;
        setWeather1(!weather1);
        setData(data);
        setRef(true);
    };
    const weatherButton2 = (value) => {
        data.reactions[data.reactions.map(v => v.name).indexOf('weather_status_limit')].status = value;
        setWeather2(value);
        setData(data);
        setRef(true);
    };


    const coffeeButton1 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('coffee_status_follower')].status = !coffee1;
        setCoffee1(!coffee1);
        setData(data);
        setRef(true);
    };
    const coffeeButton2 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('coffee_status_extras')].status = !coffee2;
        setCoffee2(!coffee2);
        setData(data);
        setRef(true);
    };
    const coffeeButton3 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('coffee_status_supporter')].status = !coffee3;
        setCoffee3(!coffee3);
        setData(data);
        setRef(true);
    };


    const cryptoButton1 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('crypto_status_usd')].status = !crypto1;
        setCrypto1(!crypto1);
        setData(data);
        setRef(true);
    };
    const cryptoButton2 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('crypto_status_eur')].status = !crypto2;
        setCrypto2(!crypto2);
        setData(data);
        setRef(true);
    };
    const cryptoButton3 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('crypto_status_chf')].status = !crypto3
        setCrypto3(!crypto3);
        setData(data);
        setRef(true);
    };
    const cryptoButton4 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('crypto_status_cad')].status = !crypto4
        setCrypto4(!crypto4);
        setData(data);
        setRef(true);
    };
    const cryptoButton5 = () => {
        data.reactions[data.reactions.map(v => v.name).indexOf('crypto_status_gbp')].status = !crypto5
        setCrypto5(!crypto5);
        setData(data);
        setRef(true);
    };


    const modeButton = (value) => {
        data.reactions[data.reactions.map(v => v.name).indexOf('mod')].status = value == 0 ? 'mail' : 'webhook';
        setSavedwebhook(value == 0 ? true : false);
        setMode(value == 0 ? 'mail' : 'webhook');
        setData(data);
        setRef(true);
    };
    const webhookButton = e => {
        e.preventDefault();
        data.reactions[data.reactions.map(v => v.name).indexOf('webhook')].status = webhook;
        setSavedwebhook(true);
        setData(data);
        setRef(true);
    };
    const saveButton = async () => {
        if (ref && savedwebhook) {
            setRef(false);
            await ApiCalls.postData('/reactions', data);
            window.location.reload();
        }
    };

    if (!data) {
        getData().then(res => {
            setData(res)
            setWebhook(res.reactions[res.reactions.map(v => v.name).indexOf('webhook')].status)
            setMode(res.reactions[res.reactions.map(v => v.name).indexOf('mod')].status)
            setSpotify1(res.reactions[res.reactions.map(v => v.name).indexOf('spotify_status_follower')].status)
            setGithub1(res.reactions[res.reactions.map(v => v.name).indexOf('github_status_follower')].status)
            setGithub2(res.reactions[res.reactions.map(v => v.name).indexOf('github_status_following')].status)
            setGithub3(res.reactions[res.reactions.map(v => v.name).indexOf('github_status_repo')].status)
            setEpitech1(res.reactions[res.reactions.map(v => v.name).indexOf('epitech_status_notification')].status)
            setWeather1(res.reactions[res.reactions.map(v => v.name).indexOf('weather_status_temperature')].status)
            setWeather2(res.reactions[res.reactions.map(v => v.name).indexOf('weather_status_limit')].status)
            setCoffee1(res.reactions[res.reactions.map(v => v.name).indexOf('coffee_status_follower')].status)
            setCoffee2(res.reactions[res.reactions.map(v => v.name).indexOf('coffee_status_extras')].status)
            setCoffee3(res.reactions[res.reactions.map(v => v.name).indexOf('coffee_status_supporter')].status)
            setCrypto1(res.reactions[res.reactions.map(v => v.name).indexOf('crypto_status_usd')].status)
            setCrypto2(res.reactions[res.reactions.map(v => v.name).indexOf('crypto_status_eur')].status)
            setCrypto3(res.reactions[res.reactions.map(v => v.name).indexOf('crypto_status_chf')].status)
            setCrypto4(res.reactions[res.reactions.map(v => v.name).indexOf('crypto_status_cad')].status)
            setCrypto5(res.reactions[res.reactions.map(v => v.name).indexOf('crypto_status_gbp')].status)
        });
        return <div>Loading...</div>
    } else if (data) {
        return (
            <div>
                <h1>Notifications</h1>
                <h2>Mode</h2>
                <input className='Switch' type="range" min="0" max="1" step="1" value={mode === 'mail' ? 0 : 1} onChange={e => modeButton(e.target.value)} />
                <p>Mode: {mode}</p>
                {mode === 'mail' ? null :
                    <form onSubmit={webhookButton}>
                        <input type="url" onChange={e => {
                            setWebhook(e.target.value)
                            setSavedwebhook(false)
                        }}/>
                        <input type="submit" value="Save " />
                        <p>webhook: {webhook ? webhook : "Enter webhook"}</p>
                    </form>
                }
                <hr/>
                <h2>Spotify</h2>
                <button className={spotify1 ? 'Button' : 'Button-red'} onClick={spotifyButton1}>Followers</button>
                <hr/>
                <h2>Github</h2>
                <button className={github1 ? 'Button' : 'Button-red'} onClick={githubButton1}>Followers</button>
                <button className={github2 ? 'Button' : 'Button-red'} onClick={githubButton2}>Following</button>
                <button className={github3 ? 'Button' : 'Button-red'} onClick={githubButton3}>Repositories</button>
                <hr/>
                <h2>Epitech</h2>
                <button className={epitech1 ? 'Button' : 'Button-red'} onClick={epitechButton1}>Notifications</button>
                <hr/>
                <h2>Weather</h2>
                <button className={weather1 ? 'Button' : 'Button-red'} onClick={weatherButton1}>Weather</button>
                {weather1 ?
                    <div>
                        <br/>
                        <input className='Slider' type="range" min="-10" max="40" step="1" value={weather2} onChange={e => weatherButton2(e.target.value)}/>
                        <p>Selected temperature: {weather2}</p>
                    </div>
                : null}
                <hr/>
                <h2>Coffee</h2>
                <button className={coffee1 ? 'Button' : 'Button-red'} onClick={coffeeButton1}>Followers</button>
                <button className={coffee2 ? 'Button' : 'Button-red'} onClick={coffeeButton2}>Extras</button>
                <button className={coffee3 ? 'Button' : 'Button-red'} onClick={coffeeButton3}>Supporters</button>
                <hr/>
                <h2>Crypto</h2>
                <button className={crypto1 ? 'Button' : 'Button-red'} onClick={cryptoButton1}>USD</button>
                <button className={crypto2 ? 'Button' : 'Button-red'} onClick={cryptoButton2}>EUR</button>
                <button className={crypto3 ? 'Button' : 'Button-red'} onClick={cryptoButton3}>CHF</button>
                <button className={crypto4 ? 'Button' : 'Button-red'} onClick={cryptoButton4}>CAD</button>
                <button className={crypto5 ? 'Button' : 'Button-red'} onClick={cryptoButton5}>GBP</button>
                <hr/>
                {savedwebhook ?
                    null
                :
                    <div>
                        <p>Please save your webhook before pressing save</p>
                    </div>
                }
                <button className={ref && savedwebhook ? 'Button' : 'Button-dis'} onClick={saveButton}>Save</button>
            </div>
        );
    }
}

export default Reaction;
