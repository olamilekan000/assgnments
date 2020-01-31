import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { withRouter } from 'react-router-dom';

const SingleAssignment = props => {
  const [assignment, setAssignment] = useState({});

  useEffect(props => {
    const assignments = localStorage.getItem('history');
    const parseAssg = JSON.parse(assignments);
    const currAssgmtn = parseAssg.filter(
      assg => assg.id === props.match.params.id
    );
    setAssignment(currAssgmtn);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div>
          {assignment.length ? (
            <div>
              <div className="col s12 m7">
                <div className="card horizontal">
                  <div className="card-image">
                    <img
                      src="https://lorempixel.com/100/190/nature/6"
                      alt="img"
                    />
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                      <p>File Names:</p>{' '}
                      <p>
                        {assignment[0].file1Name},
                        {` ${assignment[0].file2Name}`}
                      </p>
                      <br />
                      <p>Student Names:</p>{' '}
                      <p>
                        {assignment[0].student1Name},
                        {` ${assignment[0].student2Name}`}
                      </p>
                      <br />
                      <p>File Contents:</p>{' '}
                      <p>
                        File 1: {assignment[0].file1Content},<br />
                        File 2:{` ${assignment[0].file2Content}`}
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>fetching assignment</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(SingleAssignment);
