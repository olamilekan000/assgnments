import React, { useEffect, useRef, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { SignInContext } from '../contexts/SigninContext';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const Navbar = props => {
  const { authState, handleLogOut } = useContext(SignInContext);
  const sideEl = useRef(null);

  const { pathname } = props.location;
  let pathName = pathname.replace('/', '');

  useEffect(() => {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };
    const instances = M.Sidenav.init(sideEl.current, options);
  });

  const logOut = () => {
    handleLogOut();
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <Link to="/" className="brand-logo">
              Assignments
            </Link>
            <Link to="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className={pathName === 'compare' ? 'active' : null}>
                <Link to="/compare">Compare</Link>
              </li>
              <li className={pathName === 'history' ? 'active' : null}>
                <Link to="/history">History</Link>
              </li>
              {!authState.token ? null : (
                <li onClick={() => logOut()}>
                  <Link to="/">Logout</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo" ref={sideEl}>
        <li className={pathName === 'compare' ? 'active' : null}>
          <Link to="/compare">Compare</Link>
        </li>
        <li className={pathName === 'history' ? 'active' : null}>
          <Link to="/history">History</Link>
        </li>
        {!authState.token ? null : (
          <li onClick={() => logOut()}>
            <Link to="/">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
