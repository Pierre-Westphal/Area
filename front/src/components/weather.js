import React from 'react';
import ApiCalls from './apiCalls';
import '../App.css';

function Page() {
  const [data, setData] = React.useState();
  const [page , setPage] = React.useState();
  const [city, setCity] = React.useState();

  const post = async (path) => {
    const res = await ApiCalls.postData('/weather' + path, {key:"478b7656452e041d00775d8fde73a980"});
    if (res.status_code >= 100) return
    return res;
  }

  const get = async (path) => {
    const res = await ApiCalls.getData('/weather' + path);
    if (res.status_code >= 100) return
    return res;
  }

  const loginButton = async () => {
    setCity('Lyon');
    setPage(null)
    setData(null)
    await post('/login');
    lyonButton();
  };

  const lyonButton = async () => {
    setCity('Lyon');
    setPage(null)
    setData(null)
    await get('/city/Lyon');
    const res = await get('');
    setData(res.text);
    setPage('weather');
  }

  const parisButton = async () => {
    setCity('Paris');
    setPage(null)
    setData(null)
    await get('/city/Paris');
    const res = await get('');
    setData(res.text);
    setPage('weather');
  }

  const geneveButton = async () => {
    setCity('Geneve');
    setPage(null)
    setData(null)
    await get('/city/Geneve');
    const res = await get('');
    setData(res.text);
    setPage('weather');
  }

  const RefreshButton = async () => {
    setPage(null)
    setData(null)
    await post('/refresh');
    const res = await get('');
    setData(res.text);
    setPage('weather');
  };

  if (!page) {
    return (
      <div>
        <h1>Weather</h1>
        <div>
          <button className='Button' onClick={loginButton}>Login</button>
          <button className='Button' onClick={RefreshButton}>Refresh</button>
        </div>
        <div>
          <button className='Button' onClick={lyonButton}>Lyon</button>
          <button className='Button' onClick={parisButton}>Paris</button>
          <button className='Button' onClick={geneveButton}>Geneve</button>
        </div>
      </div>
    );
  }
  if (page === 'weather') {
    return (
      <div>
        <h1>Weather</h1>
        <div>
          <button className='Button' onClick={loginButton}>Login</button>
          <button className='Button' onClick={RefreshButton}>Refresh</button>
        </div>
        <div>
          <button className='Button' onClick={lyonButton}>Lyon</button>
          <button className='Button' onClick={parisButton}>Paris</button>
          <button className='Button' onClick={geneveButton}>Geneve</button>
        </div>
        <div>
          <p>City: {data.request.query}</p>
          <p>{data.current.weather_description}</p>
          <p>Temperature: {data.current.temperature}</p>
          <p>Cloud percentage: {data.current.cloudcover}</p>
          <p>Humidity: {data.current.humidity}</p>
          <p>Pressure: {data.current.pressure}</p>
          <p>Wind speed: {data.current.wind_speed}</p>
        </div>
      </div>
    );
  }
}

const Weather = () => {
  return (
    <Page/>
  );
}

export default Weather;