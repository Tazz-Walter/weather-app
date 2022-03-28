import React, { ReactNode } from 'react';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import { makeStyles, createStyles } from '@mui/styles';

const DEFAULT_TIMEOUT = 200;

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      zIndex: 0,
      position: 'relative',
    },
  }),
);

type Props = { children: ReactNode; order?: number };

/**
 * Wrapper for simplification of slide animation
 * @example
 * <SlideAnimation><SomeComponent></SlideAnimation>
 *
 */
function SlideAnimation({ children, order }: Props) {
  const classes = useStyles();
  return (
    <Slide
      direction="up"
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={DEFAULT_TIMEOUT + 60 * ((order ? order : 1) - 1)}
    >
      <Paper elevation={0} className={classes.paper}>
        {children}
      </Paper>
    </Slide>
  );
}
export default SlideAnimation;
