import React from 'react';
import useToken from './useToken';
import PropTypes from 'prop-types';
import ApiCalls from './apiCalls';
import '../App.css';

function Page() {
  const [data, setData] = React.useState();
  const [page, setPage] = React.useState();

  const fetchData = async (path) => {
    const res = await ApiCalls.getData('/coffee' + path);
    if (res.status_code >= 100) return {text: 'Error'}
    return res;
  }

  const extraButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('/extras');
    setData(res.text);
    setPage('extras');
  }

  const supporterButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('/supporters');
    setData(res.text);
    setPage('supporters');
  }

  const subscriptionButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('/subscriptions');
    setData(res.text);
    setPage('subscriptions');
  }

  const logoutButton = async () => {
    setPage(null)
    setData(null)
    await ApiCalls.getData('/coffee/logout');
    localStorage.removeItem('coffee_token');
    window.location.reload();
  }

  if (!page) {
    return (
      <div>
        <h1>coffee</h1>
        <button className='Button' onClick={extraButton}>Extras</button>
        <button className='Button' onClick={supporterButton}>Supporters</button>
        <button className='Button' onClick={subscriptionButton}>Subscriptions</button>
        <button className='Button' onClick={logoutButton}>Logout</button>
      </div>
    );
  }
  if (page === 'extras') {
    return (
      <div>
        <h1>coffee</h1>
        <button className='Button' onClick={extraButton}>Extras</button>
        <button className='Button' onClick={supporterButton}>Supporters</button>
        <button className='Button' onClick={subscriptionButton}>Subscriptions</button>
        <button className='Button' onClick={logoutButton}>Logout</button>
        <div>{JSON.stringify(data)}</div>
      </div>
    );
  }
  if (page === 'supporters') {
    return (
      <div>
        <h1>coffee</h1>
        <button className='Button' onClick={extraButton}>Extras</button>
        <button className='Button' onClick={supporterButton}>Supporters</button>
        <button className='Button' onClick={subscriptionButton}>Subscriptions</button>
        <button className='Button' onClick={logoutButton}>Logout</button>
        <div>{JSON.stringify(data)}</div>
      </div>
    );
  }
  if (page === 'subscriptions') {
    return (
      <div>
        <h1>coffee</h1>
        <button className='Button' onClick={extraButton}>Extras</button>
        <button className='Button' onClick={supporterButton}>Supporters</button>
        <button className='Button' onClick={subscriptionButton}>Subscriptions</button>
        <button className='Button' onClick={logoutButton}>Logout</button>
        <div>{JSON.stringify(data)}</div>
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
    const token = await ApiCalls.postData('/coffee/login', { key });
    if (token.status_code >= 100) {
      setError('Error ' + token.status_code + ': ' + JSON.stringify(token.text));
      return
    }
    setToken(token);
    window.location.reload();
  }

  const handleRefresh = async e => {
    e.preventDefault();
    await ApiCalls.postData('/coffee/refresh', { key });
    window.location.reload();
  }

  return (
    <div>
      <h1>Coffee</h1>
      <form onSubmit={handleLogin}>
        <label>
          <input type="text" onChange={e => setKey(e.target.value)} />
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

function Coffee() {
  const { token, setToken } = useToken('coffee_token');

  if (!token) return (
    <Login setToken={setToken} />
  );

  return (
    <Page />
  );
}

export default Coffee;

Login.propTypes = {setToken: PropTypes.func.isRequired}