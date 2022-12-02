import React, { SetStateAction, Dispatch } from 'react';
import { fetchRoot } from '../api/service';
import { FolderStructureType, TargetStructureType } from '../utils/types';

export interface ContextType {
    root: string | undefined;
    setRoot: Dispatch<SetStateAction<string | undefined>>;
    folderStructure: FolderStructureType[];
    setFolderStructure: Dispatch<SetStateAction<FolderStructureType[]>>;
}

export const DataContext = React.createContext({} as ContextType);

export default function DataProvider({ children }: { children: React.ReactNode }): JSX.Element {

    const [root, setRoot] = React.useState<string | undefined>('/');
    const [folderStructure, setFolderStructure] = React.useState<FolderStructureType[]>([{
        name: 'Root',
        type: TargetStructureType.DIRECTORY,
    }]);

    const setStructure = async (url: string) => {
        const result = await fetchRoot(url);
        if (result) {
            setFolderStructure(result.data);
        }
    }

    React.useEffect(() => {
        setStructure('/');
    }, []);

    return (
        <DataContext.Provider
            value={{
                root,
                setRoot,
                folderStructure,
                setFolderStructure
            }}
        >
            {
                children
            }
        </DataContext.Provider>
    )
}