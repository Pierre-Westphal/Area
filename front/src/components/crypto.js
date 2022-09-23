import React from 'react';
import ApiCalls from './apiCalls';
import '../App.css';
function Page() {
  const [data, setData] = React.useState();
  const [page , setPage] = React.useState();

  const get = async (path) => {
    const res = await ApiCalls.getData('/crypto' + path);
    if (res.status_code >= 100) return
    return res;
  }

  const usdButton = async () => {
    setPage(null)
    setData(null)
    const res = await get('/USD');
    setData({name: res.text.result.bpi.USD.description, value: res.text.result.bpi.USD.rate});
    setPage(true);
  }

  const eurButton = async () => {
    setPage(null)
    setData(null)
    const res = await get('/EUR');
    setData({name: res.text.result.bpi.EUR.description, value: res.text.result.bpi.EUR.rate});
    setPage(true);
  }

  const chfButton = async () => {
    setPage(null)
    setData(null)
    const res = await get('/CHF');
    setData({name: res.text.result.bpi.CHF.description, value: res.text.result.bpi.CHF.rate});
    setPage(true);
  }

  const cadButton = async () => {
    setPage(null)
    setData(null)
    const res = await get('/CAD');
    setData({name: res.text.result.bpi.CAD.description, value: res.text.result.bpi.CAD.rate});
    setPage(true);
  }

  const gbpButton = async () => {
    setPage(null)
    setData(null)
    const res = await get('/GBP');
    setData({name: res.text.result.bpi.GBP.description, value: res.text.result.bpi.GBP.rate});
    setPage(true);
  }

  if (!page) {
    return (
      <div>
        <h1>Crypto</h1>
        <div>
          <button className='Button' onClick={usdButton}>USD</button>
          <button className='Button' onClick={eurButton}>EUR</button>
          <button className='Button' onClick={chfButton}>CHF</button>
          <button className='Button' onClick={cadButton}>CAD</button>
          <button className='Button' onClick={gbpButton}>GBP</button>
        </div>
      </div>
    );
  }
  if (page) {
    return (
      <div>
        <h1>Crypto</h1>
        <div>
          <button className='Button' onClick={usdButton}>USD</button>
          <button className='Button' onClick={eurButton}>EUR</button>
          <button className='Button' onClick={chfButton}>CHF</button>
          <button className='Button' onClick={cadButton}>CAD</button>
          <button className='Button' onClick={gbpButton}>GBP</button>
        </div>
        <div>
          <p>1 Bitcoin is {data.value} {data.name}</p>
        </div>
      </div>
    );
  }
}

const Crypto = () => {
  return (
    <Page/>
  );
}

export default Crypto;