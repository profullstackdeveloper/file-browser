import React from 'react';

interface PropTypes {
    url: string;
    callback?: Function;
}

export default function RootItem ({url, callback}: PropTypes): JSX.Element {
    return (
        <div style={{ backgroundColor: 'grey', borderRadius: '10px', padding: '4px', marginRight: '3px', cursor: 'pointer' }} onClick={() => callback ? callback() : {}}>
            {
                url
            }
        </div>
    )
}