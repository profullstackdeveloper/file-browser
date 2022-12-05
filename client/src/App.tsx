import React from 'react';
import './App.css';
import Directories from './components/Directories';
import RootItem from './components/RootItem';
import { ContextType, DataContext } from './context/DataContext';

function App() {

  const { root, setRoot }: ContextType = React.useContext(DataContext);

  const handleSetRoot = (index: number) => {
    if(root) {
      setRoot(root.split('/').filter((ele, idx) => idx <= index).join('/'))
    }
  }

  const moveToRoot = () => {
    setRoot('/')
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <RootItem
          url='http://localhost:5000/'
          callback={moveToRoot}
        ></RootItem>
        {
          root && root.split('/').length > 0 && root.split('/').map((item, index) => {
            return (
              item && <RootItem url={item + '/'} callback={() => handleSetRoot(index)} key={index}></RootItem>
            )
          })
        }
      </div>
      <Directories></Directories>
    </React.Fragment>
  );
}

export default App;
