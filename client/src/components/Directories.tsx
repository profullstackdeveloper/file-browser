import React from 'react';
import { ContextType, DataContext } from '../context/DataContext';
import Directory2 from './Directory2';

export default function Directories(): JSX.Element {

    const { folderStructure, setRoot, root }: ContextType = React.useContext(DataContext);

    const handleBack = () => {
        if(root) {
            const newRoot = [...root?.split('/')];
            newRoot.pop();
            setRoot(newRoot.join('/'));
        }
    }

    return (
        <React.Fragment>
            {
                folderStructure && folderStructure.length >= 0 ? <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', cursor: 'pointer', height: 'fit-content' }} onClick={() => handleBack()}>
                        <img src='/folder-outline-filled.png' alt='folder' style={{ width: '30px', height: '30px' }}></img>
                        <div>...</div>
                    </div>
                    {
                        folderStructure.map((file, index) => {
                            return (
                                <Directory2 file={file} key={index}></Directory2>
                            )
                        })
                    }
                </div>
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', cursor: 'pointer', height: 'fit-content' }} onClick={() => setRoot('/')}>
                        <img src='/folder-outline-filled.png' alt='folder' style={{ width: '30px', height: '30px' }}></img>
                        <div>Root</div>
                    </div>
            }
        </React.Fragment>
    )
}