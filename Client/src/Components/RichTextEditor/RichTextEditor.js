import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertFromRaw, convertToRaw } from 'draft-js';

const save = (data) => {
    console.log(convertFromRaw(JSON.parse(data)));
}

const RichTextEditor = () => {
    return (
        <div>
            <MUIRichTextEditor 
                label="Type..."
                onSave={save}
            />
        </div>
    )
}

export default RichTextEditor;

