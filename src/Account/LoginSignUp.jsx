import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faEnvelope, faUser, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./LoginSignUp.css";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

library.add(fab, faCheckSquare, faEnvelope, faUser, faLock);

const LoginSignUp = ({ setUsername }) => {
  const [action, setAction] = useState('Sign Up');
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
    if (name === 'username' && action === 'Sign Up') {
      if (value.length > 15) {
        error = 'Username cannot exceed 15 characters.';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Invalid email address.';
      }
    } else if (name === 'password') {
      const passwordRegex = /^(?=.*\d).{6,}$/;
      if (!passwordRegex.test(value)) {
        error = 'Password must be at least 6 characters long and contain at least one number.';
      }
    }
    setErrors({ ...errors, [name]: error });
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
  console.log(action);
  if (
    (action === 'Sign Up' && !credentials.username) ||
    !credentials.email ||
    !credentials.password
  ) {
    console.log('Please fill in all fields');
    return;
  }

  const hasErrors = Object.values(errors).some(error => error !== '');
  if (hasErrors) {
    console.error('Form contains errors:', errors);
    return;
  }
      
  try {
    if (action === 'Login') {
      console.log(credentials);
      setAction("Signup");
      const response = await axios.post('http://localhost:8080/api/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const token = response.data.token;
      Cookies.set('token', token, { expires: 7 });
      login(token);
      setUsername(response.data.username);
      navigate('/Home');
    } else {
      setAction("Login");
      const response = await axios.post('http://localhost:8080/api/signup', {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });
      const token = response.data.token;
      Cookies.set('token', token, { expires: 7 });
      login(token);
      setUsername(credentials.username);
      navigate('/Home');
    }
  } catch (error) {
    console.error(`${action} failed`, error);
  }
};

const handleToggle = () => {
  if (action === 'Sign Up') {
    setAction('Login');
    setCredentials({ email: '', password: '' }); 
  } else if (action === 'Login') {
    setAction('Sign Up');
    setCredentials({ username: '', email: '', password: '' }); 
  }
};

const handlePasswordReset = async () => {
  console.log(resetEmail);
  try {
    await axios.post('http://localhost:8080/api/request-password-reset', { email: resetEmail });
    setResetMessage('Password reset email sent!');
  } catch (error) {
    setResetMessage('Error sending password reset email.');
  }
};

const handleForgotPasswordClick = () => {
  setIsResettingPassword(true);
};

const handleBackToLogin = () => {
  setIsResettingPassword(false);
  setResetMessage('');
  setResetEmail('');
};
    return (
      <div className='wrapper logwrap'>
        <div className='container logcontainer'>
          <div className='header logheader'>
            <Link to="/Home" className='backToHome'><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
            </Link>
            <div className='text'>{isResettingPassword ? 'Reset Password' : action}</div>
            <div className='underline'></div>
          </div>
          {!isResettingPassword ? (
            <form className='inputs' onSubmit={(e) => e.preventDefault()}>
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
                  {errors.username && <div className='error'>{errors.username}</div>}
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
                {errors.email && <div className='error'>{errors.email}</div>}
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
                {errors.password && <div className='error'>{errors.password}</div>}
              </div>
              {action === 'Login' && (
                <div className='forgotPass'>
                  Lost Password? <span onClick={handleForgotPasswordClick}>Click Here</span>
                </div>
              )}
              <div className='toggleContainer'>
                <button type='button' className="submitBtn accBtn" onClick={handleSubmit}>
                  Submit
                </button>
                <button type='button' className="LoginSignupBtn accBtn" onClick={handleToggle}>
                  {action === 'Login' ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>
          ) : (
            <form className='inputs' onSubmit={(e) => e.preventDefault()}>
              <div className='input'>
                <FontAwesomeIcon icon={['fas', 'envelope']} className='FontAwesomeIcon' />
                <input
                  type='email'
                  name='resetEmail'
                  id='resetEmail'
                  placeholder='Email'
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <div className='resetMessage'>{resetMessage}</div>
              <div className='toggleContainer'>
                <button type='button' className="submitBtn accBtn" onClick={handlePasswordReset}>
                  Reset Password
                </button>
                <button type='button' className="LoginSignupBtn accBtn" onClick={handleBackToLogin}>
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

export default LoginSignUp;