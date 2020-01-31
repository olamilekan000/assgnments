import React, { useContext, useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import HoldOn from 'react-hold-on';
import M from 'materialize-css';

import Navbar from './Navbar';
import { UploadFileContext } from '../contexts/Uploadfile';
import { SignInContext } from '../contexts/SigninContext';

M.AutoInit();

const Compare = () => {
  const { handleChange, fileMetaData, handleFileSubmission } = useContext(
    UploadFileContext
  );
  const { authState } = useContext(SignInContext);
  const [similarityPercentage, setSimilarityPercentage] = useState(0);
  const submitBtnRef = useRef(null);

  const { file1, file2, student1Name, student2Name } = fileMetaData;

  const checkFileNames = () => {
    if (
      file1 &&
      file1.name &&
      file2 &&
      file2.name &&
      student1Name &&
      student2Name
    ) {
      submitBtnRef.current.disabled = false;
    } else {
      submitBtnRef.current.disabled = true;
    }
  };

  const submitForm = async e => {
    e.preventDefault();
    HoldOn.open({
      theme: 'sk-cube-grid',
      message: 'Comparing... this might take a while. ',
      backgroundColor: '#1847B1',
      textColor: 'white'
    });
    const percentage = await handleFileSubmission();
    HoldOn.close();
    setSimilarityPercentage(percentage);
  };

  useEffect(() => {
    checkFileNames();
  });

  return (
    <div>
      {!authState.token ? <Redirect to="/login" /> : null}
      <Navbar />
      <div className="container">
        <form className="col s12" onSubmit={submitForm}>
          <div className="row">
            <div>
              <div>
                <div className="center">
                  <h5 style={{ margin: 'auto', width: '50%', marginTop: '5%' }}>
                    Similarity Percentile:
                    <p className="animated flip">{similarityPercentage}%</p>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col s12 l6">
              <div className="row">
                <div className="input-field col s12 animated bounceInLeft">
                  <div className="" id="fileName">
                    <p>
                      File Name:
                      {file1 && file1.name ? (
                        <span style={{ marginLeft: '1%' }}>{file1.name}</span>
                      ) : (
                        <span>{''}</span>
                      )}
                    </p>
                  </div>
                  <div id="uploadFormArea">
                    <label className="btn custom-file-upload">
                      <input
                        className="btn upload"
                        type="file"
                        name="file1"
                        onChange={handleChange}
                        accept="text/plain"
                      />
                      <div className="fileIcons">
                        <i className="material-icons">cloud_upload</i> File 1
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="student1Name"
                    type="text"
                    id="student1Name"
                    placeholder="Student's name"
                    className="validate"
                    onChange={handleChange}
                  />
                  <label htmlFor="text">Student 1</label>
                </div>
              </div>
            </div>

            <div className="col s12 l6">
              <div className="row">
                <div className="input-field col s12 animated bounceInRight">
                  <div className="" id="fileName">
                    <p>
                      File Name:
                      {file2 && file2.name ? (
                        <span style={{ marginLeft: '1%' }}>{file2.name}</span>
                      ) : (
                        <span>{''}</span>
                      )}
                    </p>
                  </div>
                  <div id="uploadFormArea">
                    <label className="btn custom-file-upload">
                      <input
                        className="btn upload"
                        type="file"
                        name="file2"
                        onChange={handleChange}
                        accept="text/plain"
                      />
                      <div className="fileIcons">
                        <i className="material-icons">cloud_upload</i> File 2
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="student2Name"
                    type="text"
                    id="student2Name"
                    placeholder="Student's name"
                    className="validate"
                    onChange={handleChange}
                  />
                  <label htmlFor="text">Student 2</label>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="center">
                  <input
                    name="submit"
                    type="submit"
                    className="btn"
                    value="Compare Files"
                    style={{ margin: 'auto', width: '50%' }}
                    ref={submitBtnRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Compare;
