import React from 'react';
import logo from './logo.svg';
import './App.css';
import Directory from './components/Directory';
import DataProvider, { ContextType, DataContext } from './context/DataContext';

function App() {

  const {folderStructure}: ContextType = React.useContext(DataContext);

  return (
      <div>
        {
          folderStructure && folderStructure.length > 0 && folderStructure.map((folder, index) => {
            return <Directory files={folder} key={index} />
          })
        }
      </div>
  );
}

export default App;
