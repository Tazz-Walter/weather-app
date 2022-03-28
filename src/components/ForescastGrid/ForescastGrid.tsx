/* eslint-disable array-callback-return */
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { ForecastGridDTO } from './ForescastDTO';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

const useStyles = makeStyles((theme) =>
  createStyles({
    gridContainer: {
      right: '5px',
    },
  }),
);

type Props = {
  results: Array<ForecastGridDTO>;
};

function ForecastGrid({ results }: Props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {results.map((data, index) => {
        let current = index;
        let next = index + 1;

        if (index % 2 !== 0 && next < results.length) {
          return (
            <Grid key={index} item className={classes.gridContainer}>
              <Card sx={{ minWidth: 250 }}>
                <CardContent key={results[current].number}>
                  <Typography>{results[current].name}</Typography>
                  <Typography variant="body1">
                    {format(parseISO(results[current].startTime), 'EEE dd/MM')}
                  </Typography>
                  <Typography>
                    Temperature:
                    {` ${results[current].temperature} ${results[current].temperatureUnit}`}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275 }}>
                <CardContent key={results[next].number}>
                  <Typography>{results[next].name}</Typography>
                  <Typography variant="body1">
                    {format(parseISO(results[next].startTime), 'EEE dd/MM')}
                  </Typography>
                  <Typography>
                    Temperature:
                    {` ${results[next].temperature} ${results[next].temperatureUnit}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        } else if (index % 2 !== 0 && next <= results.length) {
          return (
            <Grid key={index + 50} item style={{ right: '5px' }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent key={data.number}>
                  <Typography>{data.name}</Typography>
                  <Typography variant="body1">
                    {format(parseISO(data.startTime), 'EEE dd/MM')}
                  </Typography>
                  <Typography>
                    Temperature:
                    {` ${data.temperature} ${data.temperatureUnit}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

export default ForecastGrid;
