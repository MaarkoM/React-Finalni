import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./LoginSignUp.css";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

library.add(fab, faCheckSquare, faEnvelope, faUser, faLock);

const LoginSignUp = () => {
  const [action, setAction] = useState('Sign Up');
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(action);
    try {
      if (action === 'Login') {
        const response = await axios.post('http://localhost:5173/api/login', {
          email: credentials.email,
          password: credentials.password,
        });
        const token = response.data.token;
        Cookies.set('token', token, { expires: 7 });
        login(token);
        navigate('/');
      } else {
        const response = await axios.post('http://localhost:5173/api/signup', {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });
        const token = response.data.token;
        Cookies.set('token', token, { expires: 7 });
        login(token);
        navigate('/');
      }
    } catch (error) {
      console.error(`${action} failed`, error);
    }
  };

  const toggleAction = (newAction) => {
    if (newAction === 'Sign Up') {
      setAction('Sign Up');
      setCredentials({ ...credentials, username: '', email: '', password: '' });
      console.log(credentials);
    } else if (newAction === 'Login') {
      setAction('Login');
      setCredentials({ ...credentials, email: '', password: '' });
    }
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <form className='inputs'>
          {action === 'Sign Up' && (
            <div className='input'>
              <FontAwesomeIcon icon={['fas', 'user']} className='FontAwesomeIcon' />
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Username'
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
          )}
          <div className='input'>
            <FontAwesomeIcon icon={['fas', 'envelope']} className='FontAwesomeIcon' />
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className='input'>
            <FontAwesomeIcon icon={['fas', 'lock']} className='FontAwesomeIcon' />
            <input
              type='password'
              name='password'
              id='pass'
              placeholder='Password'
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          {action === 'Login' && (
            <div className='forgotPass'>
              Lost Password? <span>Click Here</span>
            </div>
          )}
          <div className='toggleContainer'>
            <button type='button' className={action === 'Sign Up' ? 'toggle active' : 'toggle'} onClick={() => { handleSubmit(); toggleAction('Sign Up'); }}>
              {action === 'Sign Up' ? 'Submit' : 'Sign Up'}
            </button>
            <button type='button' className={action === 'Login' ? 'toggle active' : 'toggle'} onClick={() => { handleSubmit(); toggleAction('Login'); }}>
              {action === 'Login' ? 'Submit' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;