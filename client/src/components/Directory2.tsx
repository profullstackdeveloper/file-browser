import React from 'react';
import { ContextType, DataContext } from '../context/DataContext';
import { FolderStructureType, TargetStructureType } from '../utils/types';

export default function Directory2({ file }: { file: FolderStructureType }): JSX.Element {

    const { setRoot }: ContextType = React.useContext(DataContext);

    const handleToggle = (file: FolderStructureType) => {
        if(file && file.url) {
            setRoot(file.url);
        }
    }

    return (
        file.type === TargetStructureType.DIRECTORY ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', cursor: 'pointer', height: 'fit-content' }} onClick={() => handleToggle(file)}>
                <img src='/folder-outline-filled.png' alt='folder' style={{ width: '30px', height: '30px' }}></img>
                <div>{file.name}</div>
            </div>
            : <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src='/images.png' alt='file' style={{ width: '30px', height: '30px' }} />
                <div>
                    {
                        file.name
                    }
                </div>
            </div>
    )
}