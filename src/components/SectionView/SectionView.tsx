import React, { memo, ReactNode, PropsWithChildren } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import Loader from '../Loader/Loader';
import SlideAnimation from '../SlideAnimation/SlideAnimation';

const useStyles = makeStyles(() => ({
  tableContainer: {
    padding: '30px',
  },
  tableContainerWrapper: {
    marginTop: '30px',
  },
  fullWidth: {
    width: '100%',
  },
  noResults: {
    padding: '16px',
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 20,
  },
}));

type Props = {
  title: string;
  filtersComponent: ReactNode;
  searched: boolean;
  loading: boolean;
  hasResults: boolean;
  resultComponent?: ReactNode;
};

function SectionView({
  title,
  filtersComponent,
  searched,
  loading,
  children,
  hasResults,
  resultComponent,
}: PropsWithChildren<Props>) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <SlideAnimation>
          <Grid item xs={12}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{title}</Typography>
              </AccordionSummary>
              <Grid container>
                <AccordionDetails className={classes.fullWidth}>
                  <Grid item xs={12}>
                    <Grid container>{filtersComponent}</Grid>
                  </Grid>
                </AccordionDetails>
              </Grid>
            </Accordion>
          </Grid>
        </SlideAnimation>
      </Grid>
      {loading ? (
        <Grid item xs={12}>
          <Loader />
        </Grid>
      ) : (
        <Grid item xs={12} className={classes.tableContainerWrapper}>
          <SlideAnimation>
            {searched && resultComponent && (
              <Grid item xs={12}>
                <Accordion defaultExpanded={false}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Week Forecast</Typography>
                  </AccordionSummary>
                  <AccordionDetails>{resultComponent}</AccordionDetails>
                </Accordion>
              </Grid>
            )}
            {searched && (
              <Grid item xs={12}>
                <Paper className={classes.tableContainer}>
                  {!hasResults ? (
                    <Typography variant="h6" className={classes.noResults}>
                      No result where found
                    </Typography>
                  ) : (
                    children
                  )}
                </Paper>
              </Grid>
            )}
          </SlideAnimation>
        </Grid>
      )}
    </Grid>
  );
}

export default memo(SectionView);
