import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Field, FormikProps, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  fullWidth: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectionFields: {
    padding: '10px',
  },
  submitBtnContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
}));

type Props = {
  handleSearch: (search: FormValues) => void;
};

export enum FormFieldNames {
  street = 'street',
  city = 'city',
  state = 'state',
}

export interface FormValues {
  [FormFieldNames.street]: string;
  [FormFieldNames.city]: string;
  [FormFieldNames.state]: string;
}

function FilterSearch({ handleSearch }: Props) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        [FormFieldNames.street]: '',
        [FormFieldNames.city]: '',
        [FormFieldNames.state]: '',
      }}
      validationSchema={yup.object({
        street: yup.string().required('required to complete the street'),
        city: yup.string().required('required to complete the city'),
        state: yup
          .string()
          .required('required to complete the state')
          .max(2, `Max lenght 2`),
      })}
      onSubmit={(
        formValues: FormValues,
        formikHelpers: FormikHelpers<FormValues>,
      ) => handleSearch(formValues)}
    >
      {({ handleSubmit, errors, isValid }: FormikProps<FormValues>) => {
        return (
          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <Grid container className={classes.form}>
              <Grid item className={classes.selectionFields}>
                <Field
                  name={FormFieldNames.street}
                  placeholder="Insert street"
                  label="Street"
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors[FormFieldNames.street])}
                  helperText={errors[FormFieldNames.street]}
                  fullWidth
                  as={TextField}
                />
              </Grid>
              <Grid item className={classes.selectionFields}>
                <Field
                  name={FormFieldNames.city}
                  placeholder="Insert city"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors[FormFieldNames.city])}
                  helperText={errors[FormFieldNames.city]}
                  fullWidth
                  as={TextField}
                />
              </Grid>
              <Grid item className={classes.selectionFields}>
                <Field
                  name={FormFieldNames.state}
                  placeholder="Insert state"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors[FormFieldNames.state])}
                  helperText={errors[FormFieldNames.state]}
                  fullWidth
                  as={TextField}
                />
              </Grid>
              <Grid item className={classes.submitBtnContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default FilterSearch;
