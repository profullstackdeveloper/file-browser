import React from 'react';
import logo from './logo.svg';
import './App.css';
import Directory from './components/Directory';
import DataProvider, { ContextType, DataContext } from './context/DataContext';
import { fetchRoot } from './api/service';
import { FolderStructureType } from './utils/types';

function App() {

  const { root, folderStructure, setRoot, setFolderStructure }: ContextType = React.useContext(DataContext);
  const toggle = async (index: number) => {
    const url = root?.split('/').slice(0, index + 1).join('/');
    setRoot(url);
    console.log('url is ', url);
    if (url) {
      const response = await fetchRoot(url);
      const targetArray = url.split('/');
      setRoot(url);
      const tmp_folderStructure = [...folderStructure];
      if (response.data && response.data.length > 0) {
        if (targetArray)
          getItem(tmp_folderStructure, targetArray, 1, response.data);
      }
      setFolderStructure(tmp_folderStructure);
    }

  }

  function getItem(itemArray: FolderStructureType[], targetArray: string[], index: number, data: FolderStructureType[]) {

    if (targetArray && index === targetArray.length) {
      const tempItemArray: any = [];
      itemArray.forEach((item) => {
        const { items, ...tempItem } = item;
        tempItemArray.push(JSON.stringify(tempItem));
      })
      console.log(tempItemArray);
      for (let itr of data) {
        console.log(itr, tempItemArray.includes(JSON.stringify(itr)))
        if (!tempItemArray.includes(JSON.stringify(itr))) {
          itemArray.push(itr);
        }
      }
      return;
    }
    const tmp = itemArray.filter((item, itr) => item.name === targetArray[index])[0];
    if (!tmp.items) {
      tmp.items = [];
    }
    getItem(tmp.items, targetArray, index + 1, data)
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'grey', borderRadius: '10px', padding: '4px', marginRight: '3px', cursor: 'pointer' }}>
          https://localhost:5000/
        </div>
        {
          root?.split('/').map((path, index) => {
            console.log(path);
            return (
              path && <div style={{ backgroundColor: 'grey', borderRadius: '10px', padding: '4px', marginRight: '3px', cursor: 'pointer' }} onClick={() => toggle(index)}>
                {
                  path + '/'
                }
              </div>
            )
          })
        }
      </div>
      {
        folderStructure && folderStructure.length > 0 && folderStructure.map((folder, index) => {
          return <Directory files={folder} key={index} />
        })
      }
    </div>
  );
}

export default App;
