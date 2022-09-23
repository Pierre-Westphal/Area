import React from 'react';
import '../App.css';

const file = 'https://github.com/Neotoxic-off/Libraries/raw/main/app-release.apk';

function Apk() {
    return (
      <div>
        <a className='Button' href={file} download='app'>Download</a>
      </div>
    );
}

export default Apk;
