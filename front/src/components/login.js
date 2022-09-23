import React from 'react';
import PropTypes from 'prop-types';
import ApiCalls from './apiCalls';
import '../App.css';

export default function Login({ setToken }) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();

    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }
        if (!password) {
            setError('Please enter a valid password');
            return;
        }
        const token = await ApiCalls.postData('/database/login', { email, password });
        if (token.status_code >= 100) {
            setError(JSON.stringify(token.text));
            return
        }
        setToken(token);
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <p>{error}</p>
                <div>
                    <button className='Button' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {setToken: PropTypes.func.isRequired}
