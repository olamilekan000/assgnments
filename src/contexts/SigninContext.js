import React, { createContext, useReducer, useState } from 'react';
import uuid from 'uuid/v1';
import HoldOn from 'react-hold-on';

import { signInReducer } from '../reducers/SignInReducer';
import Axios from 'axios';

export const SignInContext = createContext();

const AuthContextProvider = props => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });

  const [authState, dispatch] = useReducer(signInReducer, {
    token: localStorage.getItem('token') || null,
    error: false,
    message: null
  });

  const handleInputChange = user => {
    setUserDetails({ ...userDetails, ...user });
  };

  const handleLogOut = () => {
    HoldOn.open({
      theme: 'sk-cube-grid',
      message: 'Logging out ',
      backgroundColor: '#1847B1',
      textColor: 'white'
    });
    localStorage.clear();

    dispatch({
      type: 'LOG_OUT',
      payload: {
        error: null,
        message: null,
        token: null
      }
    });
    setUserDetails({});
    HoldOn.close();
  };

  const errorDispatch = (error, message) => {
    dispatch({
      type: 'SIGN_IN_ERROR',
      payload: {
        error,
        message
      }
    });
  };

  const rightUserCredentials = {
    email: 'test@yahoo.com',
    password: '123456789'
  };

  const handleSubmit = async e => {
    e.preventDefault();

    HoldOn.open({
      theme: 'sk-cube-grid',
      message: 'Signing In ',
      backgroundColor: '#1847B1',
      textColor: 'white'
    });

    errorDispatch(false, null);

    await Axios.post(
      'https://a10e689d-e59c-4ad8-80c7-369d8721c099.mock.pstmn.io/auth/users',
      rightUserCredentials
    )
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        errorDispatch(true, 'Internal server error');
      });

    if (userDetails.email !== rightUserCredentials.email) {
      errorDispatch(true, 'This user does not exist, kindly contact the admin');
      HoldOn.close();
    } else if (userDetails.password !== rightUserCredentials.password) {
      errorDispatch(true, 'Incorrect email or password');
      HoldOn.close();
    } else {
      const token = uuid();
      dispatch({
        type: 'SIGN_IN_SUCCESS',
        payload: {
          token: `Bearer: ${token}`,
          message: 'Login was successful'
        }
      });
      localStorage.setItem('token', token);
      HoldOn.close();
    }
  };

  return (
    <SignInContext.Provider
      value={{ handleInputChange, handleSubmit, authState, handleLogOut }}
    >
      {props.children}
    </SignInContext.Provider>
  );
};

export default AuthContextProvider;
