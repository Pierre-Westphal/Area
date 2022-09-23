import React from 'react';
import useToken from './useToken';
import PropTypes from 'prop-types';
import ApiCalls from './apiCalls';
import '../App.css';

function Page() {
  const [data, setData] = React.useState();
  const [page , setPage] = React.useState();

  const fetchData = async (path) => {
    const res = await ApiCalls.getData('/epitech/' + path);
    try {if (res.status_code >= 100) return} catch {}
    try {if (res.epitech.status_code >= 100) return} catch {}
    return res;
  }

  const userButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('user');
    setData(res.epitech.text);
    setPage('user');
  };

  const notificationsButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('notifications');
    setData(res.text);
    setPage('notifications');
  };

  if (!page) {
    return (
      <div>
        <h1>Epitech</h1>
        <button className='Button' onClick={userButton}>User</button>
        <button className='Button' onClick={notificationsButton}>Notifications</button>
        <button className='Button' onClick={() => {localStorage.removeItem('epitech_token'); window.location.reload()}}>Logout</button>
      </div>
    );
  }
  if (page === 'user') {
    return (
      <div>
        <h1>Epitech</h1>
        <button className='Button' onClick={userButton}>User</button>
        <button className='Button' onClick={notificationsButton}>Notifications</button>
        <button className='Button' onClick={() => {localStorage.removeItem('epitech_token'); window.location.reload()}}>Logout</button>
        <div>
          <p>{data.login}</p>
          <p>{data.title}</p>
          <p>{data.course_code}</p>
          <p>Promo {data.promo}</p>
        </div>
      </div>
    );
  }
  if (page === 'notifications') {
    console.log(data);
    return (
      <div>
        <h1>Epitech</h1>
        <button className='Button' onClick={userButton}>User</button>
        <button className='Button' onClick={notificationsButton}>Notifications</button>
        <button className='Button' onClick={() => {localStorage.removeItem('epitech_token'); window.location.reload()}}>Logout</button>
        <div>
          <p>{data}</p>
        </div>
      </div>
    );
  }
}

function Login({ setToken }) {
  const [key, setKey] = React.useState();
  const [error, setError] = React.useState();

  const handleLogin = async e => {
    e.preventDefault();
    if (!key) {
      setError('Please enter a valid key');
      return;
    }
    const token = await ApiCalls.postData('/epitech/login', { key });
    if (token.status_code >= 100) {
      setError('Error ' + token.status_code + ': ' + JSON.stringify(token.text));
      return
    }
    setToken(token);
    window.location.reload();
  }

  const handleRefresh = async e => {
    e.preventDefault();
    await ApiCalls.postData('/epitech/refresh', { key });
  }

  return (
    <div>
      <h1>Epitech</h1>
      <form onSubmit={handleLogin}>
        <label>
          <input type="text" onChange={e => setKey(e.target.value)}/>
        </label>
        <p>{error}</p>
        <div>
          <button className='Button' type='submit'>Login</button>
          <button className='Button' onClick={handleRefresh}>Refresh</button>
        </div>
      </form>
    </div>
  );
}

function Epitech() {
  const { token, setToken } = useToken('epitech_token');

  if (!token) return (
    <Login setToken={setToken} />
  );

  return (
    <Page />
  );
}

export default Epitech;

Login.propTypes = {setToken: PropTypes.func.isRequired}
