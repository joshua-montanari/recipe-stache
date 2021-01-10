import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

const editorTheme = createMuiTheme({
    overrides: {
        MUIRichTextEditor: {
            root: {
                backgroundColor: "#ebebeb",
            },
            container: {
                display: "flex",
                flexDirection: "column-reverse",
            },
            editor: {
                backgroundColor: "#ebebeb",
                padding: "20px",
                height: "200px",
                maxHeight: "200px",
                overflow: "auto",
                borderBottom: "1px solid gray",
            },
            toolbar: {
                borderBottom: "1px solid gray",
                backgroundColor: "#ebebeb",
            },
            placeHolder: {
                backgroundColor: "#ebebeb",
                paddingLeft: 20,
                width: "inherit",
                position: "absolute",
                top: "20px"
            },
            anchorLink: {
                color: "#333333",
                textDecoration: "underline"
            }
        }
    }
});

const save = (data) => {
    console.log(convertFromRaw(JSON.parse(data)));
}

const RichTextEditor = ({setRecipeSteps, recipeStepsError}) => {

    return (
        <MuiThemeProvider theme={editorTheme}>
            <MUIRichTextEditor 
                label="Recipe Steps"
                onSave={save}
                onChange={data => setRecipeSteps(data.getCurrentContent())}
                error={recipeStepsError}
            />
            <Box p={1} />
        </MuiThemeProvider>
    );
}

export default RichTextEditor;

