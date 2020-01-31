import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { SignInContext } from '../contexts/SigninContext';
import Navbar from './Navbar';

const History = props => {
  const { authState } = useContext(SignInContext);

  if (!localStorage.getItem('history')) {
    localStorage.setItem('history', JSON.stringify([]));
  }
  const allHistories = localStorage.getItem('history')
    ? localStorage.getItem('history')
    : [];
  const cleanHistory = JSON.parse(allHistories);

  return (
    <div>
      {!authState.token ? <Redirect to="/login" /> : null}
      <Navbar />
      <div className="container">
        <div style={{ marginTop: '5%' }}>
          {cleanHistory.length ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Student 1</th>
                    <th>File Content</th>
                    <th>Student 2</th>
                    <th>File Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {cleanHistory.map(history => {
                    return (
                      <tr key={history.id}>
                        <td>{history.student1Name}</td>
                        <td>{history.file1Content}</td>
                        <td>{history.student2Name}</td>
                        <td>{history.file2Content}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={e => {
                              e.preventDefault();
                              props.history.push(`/assignment/${history.id}`);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="no-history">
              <h5>You are yet to compare any students' files</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(History);
