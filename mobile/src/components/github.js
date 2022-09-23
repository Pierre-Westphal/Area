import React from 'react';
import ApiCalls from './apiCalls';
import '../App.css';

function Page() {
  const [data, setData] = React.useState();
  const [page, setPage] = React.useState();
  const [username, setUsername] = React.useState();
  const [owner, setOwner] = React.useState();
  const [repositories, setRepositories] = React.useState();

  const fetchData = async (path) => {
    const res = await ApiCalls.getData('/github' + path);
    if (res.status_code >= 100) return {text: 'Error'}
    return res;
  }

  const handleUsername = async e => {
    setPage(null);
    setData(null);
    e.preventDefault();
    const res = await ApiCalls.getData('/github/user/' + username);
    setData(res.text);
    setPage('username');
  }

  const RepositoriesButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('/repositories');
    setData(res.text);
    setPage('repositories');
  }

  const UserButton = async () => {
    setPage(null)
    setData(null)
    const res = await fetchData('/user');
    setData(res.text);
    setPage('user');
  }

  const OwnerRepositoriesButton = async e => {
    setPage(null);
    setData(null);
    e.preventDefault();
    const res = await ApiCalls.getData('/github/user/' + username);
    setData(res.text);
    setPage('OwnerRepositories');
  }

  const ActionRepositoriesOwnerButton = async e => {
    setPage(null);
    setData(null);
    e.preventDefault();
    const res = await ApiCalls.getData('/github/actions/' + owner + '/' + username);
    setData(res.text);
    setPage('ActionOwnerRepositories');
  }

  const BranchesRepositoriesOwnerButton = async e => {
    setPage(null);
    setData(null);
    e.preventDefault();
    const res = await ApiCalls.getData('/github/branches/' + owner + '/' + username);
    setData(res.text);
    setPage('BranchesOwnerRepositories');
  }

  const EventRepositoriesOwnerButton = async e => {
    setPage(null);
    setData(null);
    e.preventDefault();
    const res = await ApiCalls.getData('/github/events/' + owner + '/' + username);
    setData(res.text);
    setPage('EventOwnerRepositories');
  }

  if (!page) {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
      </div>
    );
  }
  if (page === 'repositories') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <p>Repositories : {data[0].branches_url.clone_url}</p>
      </div>
    );
  }
  if (page === 'user') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <p>Login : {data.login}</p>
        <p>Organisation : {data.organizations_url}</p>
        <p>Company : {data.company}</p>
        <p>Url : {data.url}</p>
        <p>HTML_url : {data.html_url}</p>
        <p>Public repos : {data.public_repos}</p>
      </div>
    );
  }
  if (page === 'username') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <p>Login : {data.login}</p>
        <p>Location : {data.location}</p>
        <p>Id : {data.id}</p>
        <p>Organizations_url : {data.organizations_url}</p>
        <p>Followers : {data.followers}</p>
        <p>Following : {data.following}</p>
      </div>
    );
  }
  if (page === 'repositories') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <p>Repositories : {data[0].branches_url.clone_url}</p>
      </div>
    );
  }
  if (page === 'OwnerRepositories') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <div>{JSON.stringify(data)}</div>
      </div>
    );
  }
  if (page === 'ActionOwnerRepositories') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <div>{JSON.stringify(data)}</div>
      </div>
    );
  }
  if (page === 'BranchesOwnerRepositoriess') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <div>{JSON.stringify(data)}</div>
      </div>
    );
  }
  if (page === 'EventOwnerRepositories') {
    return (
      <div>
        <h1>Github</h1>
        <a className='Button' href='/api/github/login' target='_blank'>Login</a>
        <button className='Button' onClick={RepositoriesButton}>Repositories</button>
        <button className='Button' onClick={UserButton}>User</button>
        <form onSubmit={handleUsername}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </form>
        <form onSubmit={OwnerRepositoriesButton}>
          <br/>
          <p>RepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setOwner(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={ActionRepositoriesOwnerButton}>
          <br/>
          <p>ActionsRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={BranchesRepositoriesOwnerButton}>
          <br/>
          <p>BranchesRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <form onSubmit={EventRepositoriesOwnerButton}>
          <br/>
          <p>EventRepositoriesOwner</p>
          <input type="text" placeholder="Owner" onChange={e => setUsername(e.target.value)}/>
          <input type="text" placeholder="Repository" onChange={e => setRepositories(e.target.value)}/>
          <button className='Button' type='submit'>Submit</button>
        </form>
        <div>{JSON.stringify(data)}</div>
      </div>
    );
  }
}

const Github = ({}) => {
  return (
    <Page/>
    );
}

export default Github;