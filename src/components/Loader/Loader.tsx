import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 0,
      margin: '0 auto',
    },
  }),
);

function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" thickness={6} />
    </div>
  );
}

export default Loader;
