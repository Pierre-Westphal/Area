import React from 'react';
import '../App.css';

const homepage = () => {
    return (
      <div>
        <br/><br/>
        <div>
          <a className='Button' href='/coffee'>Coffee</a>
          <a className='Button' href='/weather'>Weather</a>
          <a className='Button' href='/reaction'>Reactions</a>
          <a className='Button' href='/spotify'>Spotify</a>
          <a className='Button' href='/crypto'>Cryptos</a>
        </div>
        <div>
          <a className='Button' href='/github'>Github</a>
          <a className='Button' href='/epitech'>Epitech</a>
          <a className='Button' href='/apk'>Apk</a>
          <a className='Button' href='/routes'>Routes</a>
          <a className='Button' href="/about">About</a>
        </div>
        <div>
          <a className='Button' href="/login" onClick={() => localStorage.clear()}>Logout</a>
        </div>
        <br/>
      </div>
    );
}

export default homepage;
