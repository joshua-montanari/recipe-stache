import React from 'react';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
//import 'draft-js/dist/Draft.css';

const RecipeEditor = ({recipeSteps, setRecipeSteps}) => {

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return (
        <>
            <Editor editorState={editorState} onEditorStateChange={setEditorState} />;
        </>
    );
}

export default RecipeEditor;
