import axios from 'axios';

export const getGeocodingLatitudeLongitude = (
  street: string,
  city: string,
  state: string,
) => {
  return axios
    .get(
      `https://geocoding.geo.census.gov/geocoder/locations/address?street=${street}&city=${city}&state=${state}&benchmark=2020&format=json`,
    )
    .then(({ data }) => data.result.addressMatches[0].coordinates);
};

export const getPoints = (latitude: string, longitude: string) => {
  return axios
    .get(`https://api.weather.gov/points/${latitude},${longitude}`)
    .then(({ data }) => data.properties.forecastGridData);
};

export const getForestcast = (url: string) => {
  return axios
    .get(`${url}/forecast`)
    .then(({ data }) => data.properties.periods);
};
