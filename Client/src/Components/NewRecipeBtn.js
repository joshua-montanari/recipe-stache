import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));



export default function FloatingActionButtons() {
  const classes = useStyles();

  const theme = useTheme()
  //*responds true if screen size is 'sm' or smaller
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const history = useHistory()

  const newRecipe = () => history.push('/create-recipe')

  return (
    <div className={classes.root}>
        {isMobile ? (
            <Fab color="primary" aria-label="add" onClick={newRecipe}>
                <AddIcon />
            </Fab>
        ):(
            <Fab variant="extended" color="primary" aria-label="add" onClick={newRecipe}>
                <AddIcon className={classes.extendedIcon} />
                New Recipe
            </Fab>
        )}
    </div>
  );
}