import React from 'react';
import ApiCalls from './apiCalls';
import '../App.css';

function Page() {
    const [data, setData] = React.useState();
    const [page, setPage] = React.useState();
    const [name, setName] = React.useState();

    const fetchDatabeta = async (path) => {
      const res = await ApiCalls.getData('/beta/spotify/' + path);
      if (res.status_code >= 100) return {text: 'Error'}
      return res;
    }

    const fetchData = async (path) => {
      const res = await ApiCalls.getData('/spotify' + path);
      if (res.status_code >= 100) return {text: 'Error'}
      return res;
    }

    const UserButton = async () => {
      setPage(null)
      setData(null)
      const res = await fetchDatabeta('/user');
      setData(res);
      setPage('user');
    }

    const LogoutButton = async () => {
      setPage(null)
      setData(null)
      const res = await fetchDatabeta('/logout');
      setData(res.text);
      setPage('user');
    }

    const SearchPlaylistButton = async e => {
      setPage(null);
      setData(null);
      e.preventDefault();
      const res = await ApiCalls.getData('/spotify/search/playlist/' + name);
      setData(res.text);
      setPage('playlist');
    }
    const SearchAlbumButton = async e => {
      setPage(null);
      setData(null);
      e.preventDefault();
      const res = await ApiCalls.getData('/spotify/search/album/' + name);
      setData(res.text);
      setPage('Searchalbum');
    }
    const SearchTrackButton = async e => {
      setPage(null);
      setData(null);
      e.preventDefault();
      const res = await ApiCalls.getData('/spotify/search/track/' + name);
      setData(res.text);
      setPage('track');
    }
    const SearchArtistButton = async e => {
      setPage(null);
      setData(null);
      e.preventDefault();
      const res = await ApiCalls.getData('/spotify/search/artist/' + name);
      setData(res.text);
      setPage('artist');
    }
  
    if (!page) {
      return (
        <div>
          <h1>Spotify</h1>
          <a className='Button' href='http://localhost:8080/api/beta/spotify/login' target='_blank'>Login</a>
          <button className='Button' onClick={LogoutButton}>Logout</button>
          <button className='Button' onClick={UserButton}>User</button>
          <form onSubmit={SearchPlaylistButton}>
            <br/>
            <input type="text" placeholder="Playlist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchAlbumButton}>
            <br/>
            <input type="text" placeholder="Album" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchTrackButton}>
            <br/>
            <input type="text" placeholder="Track" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchArtistButton}>
            <br/>
            <input type="text" placeholder="Artist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
        </div>
      );
    }
    if (page === 'user') {
      return (
        <div>
          <h1>Spotify</h1>
          <a className='Button' href='http://localhost:8080/api/beta/spotify/login' target='_blank'>Login</a>
          <button className='Button' onClick={LogoutButton}>Logout</button>
          <button className='Button' onClick={UserButton}>User</button>
          <form onSubmit={SearchPlaylistButton}>
            <br/>
            <input type="text" placeholder="Playlist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchAlbumButton}>
            <br/>
            <input type="text" placeholder="Album" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchTrackButton}>
            <br/>
            <input type="text" placeholder="Track" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchArtistButton}>
            <br/>
            <input type="text" placeholder="Artist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <p>Name : {data.display_name}</p>
          <p>Id : {data.id}</p>
          <p>Followers : {data.followers.total}</p>
        </div>
      );
    }
    if (page === 'playlist') {
      return (
        <div>
          <h1>Spotify</h1>
          <a className='Button' href='http://localhost:8080/api/beta/spotify/login' target='_blank'>Login</a>
          <button className='Button' onClick={LogoutButton}>Logout</button>
          <button className='Button' onClick={UserButton}>User</button>
          <form onSubmit={SearchPlaylistButton}>
            <br/>
            <input type="text" placeholder="Playlist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchAlbumButton}>
            <br/>
            <input type="text" placeholder="Album" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchTrackButton}>
            <br/>
            <input type="text" placeholder="Track" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchArtistButton}>
            <br/>
            <input type="text" placeholder="Artist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <div>{JSON.stringify(data)}</div>
        </div>
      );
    }
    if (page === 'track') {
      return (
        <div>
          <h1>Spotify</h1>
          <a className='Button' href='http://localhost:8080/api/beta/spotify/login' target='_blank'>Login</a>
          <button className='Button' onClick={LogoutButton}>Logout</button>
          <button className='Button' onClick={UserButton}>User</button>
          <form onSubmit={SearchPlaylistButton}>
            <br/>
            <input type="text" placeholder="Playlist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchAlbumButton}>
            <br/>
            <input type="text" placeholder="Album" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchTrackButton}>
            <br/>
            <input type="text" placeholder="Track" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchArtistButton}>
            <br/>
            <input type="text" placeholder="Artist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <div>{JSON.stringify(data)}</div>
        </div>
      );
    }
    if (page === 'artist') {
      return (
        <div>
          <h1>Spotify</h1>
          <a className='Button' href='http://localhost:8080/api/beta/spotify/login' target='_blank'>Login</a>
          <button className='Button' onClick={LogoutButton}>Logout</button>
          <button className='Button' onClick={UserButton}>User</button>
          <form onSubmit={SearchPlaylistButton}>
            <br/>
            <input type="text" placeholder="Playlist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchAlbumButton}>
            <br/>
            <input type="text" placeholder="Album" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchTrackButton}>
            <br/>
            <input type="text" placeholder="Track" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchArtistButton}>
            <br/>
            <input type="text" placeholder="Artist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <div>{JSON.stringify(data)}</div>
        </div>
      );
    }
    if (page === 'Searchalbum') {
      return (
        <div>
          <h1>Spotify</h1>
          <a className='Button' href='http://localhost:8080/api/beta/spotify/login' target='_blank'>Login</a>
          <button className='Button' onClick={LogoutButton}>Logout</button>
          <button className='Button' onClick={UserButton}>User</button>
          <form onSubmit={SearchPlaylistButton}>
            <br/>
            <input type="text" placeholder="Playlist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchAlbumButton}>
            <br/>
            <input type="text" placeholder="Album" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchTrackButton}>
            <br/>
            <input type="text" placeholder="Track" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <form onSubmit={SearchArtistButton}>
            <br/>
            <input type="text" placeholder="Artist" onChange={e => setName(e.target.value)}/>
            <button className='Button' type='submit'>Submit</button>
          </form>
          <div>{JSON.stringify(data)}</div>
        </div>
      );
    }
}

  

const Spotify = () => {
    return (
        <Page/>
    );
}

export default Spotify;
