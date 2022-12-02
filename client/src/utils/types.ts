export enum TargetStructureType {
    FILE = 'file',
    DIRECTORY = 'directory'
}


export interface FolderStructureType {
    type: TargetStructureType;
    name: string;
    items?: FolderStructureType[];
    url?: string;
}