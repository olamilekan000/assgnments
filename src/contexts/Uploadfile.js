import React, { createContext, useState } from 'react';
import uuid from 'uuid';

export const UploadFileContext = createContext();

const UploadFileContextProvider = props => {
  const [fileMetaData, setFileMetadata] = useState({
    file1: '',
    file2: '',
    file1Content: '',
    file2Content: '',
    student1Name: '',
    student2Name: ''
  });

  const handleChange = e => {
    setFileMetadata({
      ...fileMetaData,
      [e.target.name]: !e.target.files ? e.target.value : e.target.files[0]
    });
  };

  const saveHistory = historyObject => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(historyObject);
    localStorage.setItem('history', JSON.stringify(history));
  };

  const readFileContent = async blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(evt) {
        resolve(evt.target.result);
      };
      reader.readAsText(blob, 'UTF-8');
      reader.onerror = function(err) {
        reject(err);
      };
    });
  };

  function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    );
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    let costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j;
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  const handleFileSubmission = async () => {
    const { file1, file2, student1Name, student2Name } = fileMetaData;
    const file1Content = await readFileContent(file1);
    const file2Content = await readFileContent(file2);
    const similarityPercentage = similarity(file1Content, file2Content);

    const historyObject = {
      id: uuid(),
      file1Name: file1.name,
      file2Name: file2.name,
      file1Content,
      file2Content,
      student1Name,
      student2Name
    };

    saveHistory(historyObject);

    return Math.floor(similarityPercentage * 100);
  };

  return (
    <UploadFileContext.Provider
      value={{ handleChange, fileMetaData, handleFileSubmission }}
    >
      {props.children}
    </UploadFileContext.Provider>
  );
};

export default UploadFileContextProvider;
