import React from 'react';
import { fetchRoot } from '../api/service';
import { ContextType, DataContext } from '../context/DataContext';
import { FolderStructureType, TargetStructureType } from '../utils/types';

export default function Directory({ files }: { files: FolderStructureType }): JSX.Element {

    const [isExpand, setIsExpand] = React.useState(false);

    const { root, setRoot, setFolderStructure, folderStructure }: ContextType = React.useContext(DataContext);

    const toggle = async (file: FolderStructureType) => {
        setIsExpand(!isExpand);
        if(file.url) {
            setRoot(file.url);
        }
        if (!file.items && file.url) {
            console.log('called')
            const response = await fetchRoot(file.url);
            console.log(response.data);
            const targetArray = (file.url).split('/');
            setRoot(file.url);
            const tmp_folderStructure = folderStructure;
            if (response.data && response.data.length > 0) {
                if (targetArray)
                    getItem(tmp_folderStructure, targetArray, 1, response.data);
            }
            setFolderStructure(tmp_folderStructure);
        }
    }

    function getItem(itemArray: FolderStructureType[], targetArray: string[], index: number, data: Array<any>) {

        if (targetArray && index === targetArray.length) {
            for (let itr of data)
                itemArray.push(itr);
            return;
        }
        const tmp = itemArray.filter((item, itr) => item.name === targetArray[index])[0];
        if (!tmp.items) {
            tmp.items = [];
        }
        getItem(tmp.items, targetArray, index + 1, data)
    }

    return (
        files.type === TargetStructureType.FILE ?
            <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                <img src='images.png' alt='file' style={{ width: '30px', height: '30px' }} />
                <div>
                    {
                        files.name
                    }
                </div>
            </div>
            : <>
                <div style={{ marginLeft: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', cursor: 'pointer', height: 'fit-content', backgroundColor: `${files.url === root ? 'blue' : ''}` }} onClick={() => { toggle(files) }}>
                        <img src='/folder-outline-filled.png' alt='folder' style={{ width: '30px', height: '30px' }}></img>
                        <div>{files.name}</div>
                    </div>
                    {
                        isExpand && files.items && files.items.length > 0 && files.items.map((item, index) => (
                            <Directory files={item} key={index}></Directory>
                        ))
                    }
                </div>
            </>
    )
}