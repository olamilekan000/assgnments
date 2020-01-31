import React, { useContext } from 'react';
import Navbar from './Navbar';

import { SignInContext } from '../contexts/SigninContext';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const { handleInputChange, handleSubmit, authState } = useContext(
    SignInContext
  );

  return (
    <div>
      {authState.token ? <Redirect to="/compare" /> : null}
      <Navbar />
      <div className="container">
        <div id="form-container">
          <div className="card animated bounceIn">
            <div className="card-content">
              <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        name="email"
                        type="email"
                        className="validate"
                        id="email"
                        onChange={e => {
                          handleInputChange({
                            [e.target.name]: e.target.value
                          });
                        }}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        name="password"
                        type="password"
                        className="validate"
                        id="password"
                        onChange={e => {
                          handleInputChange({
                            [e.target.name]: e.target.value
                          });
                        }}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button className="btn">Login</button>
                    </div>
                  </div>
                </form>
                <div className="center">
                  {authState.error ? (
                    <div style={{ color: 'red' }}>{authState.message}</div>
                  ) : null}
                  {authState.token ? (
                    <div style={{ color: 'green' }}>{authState.message}</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
