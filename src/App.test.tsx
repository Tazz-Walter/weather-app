import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

const getGeocodingLatitudeLongitudeResp = {
  result: {
    addressMatches: [
      {
        coordinates: {
          x: -76.62757,
          y: 39.286522,
        },
      },
    ],
  },
};

const getPointsMock = {
  properties: {
    forecastGridData: 'https://zaraza.com',
  },
};

const getForestcastMock = {
  properties: {
    periods: [
      {
        number: 1,
        name: 'Monday',
        startTime: '2022-03-28T06:00:00-04:00',
        endTime: '2022-03-28T18:00:00-04:00',
        isDaytime: true,
        temperature: 40,
        temperatureUnit: 'F',
        temperatureTrend: null,
        windSpeed: '9 to 22 mph',
        windDirection: 'NW',
        icon: 'https://api.weather.gov/icons/land/day/wind_sct?size=medium',
        shortForecast: 'Mostly Sunny',
        detailedForecast:
          'Mostly sunny, with a high near 40. Northwest wind 9 to 22 mph, with gusts as high as 39 mph.',
      },
      {
        number: 2,
        name: 'Monday Night',
        startTime: '2022-03-28T18:00:00-04:00',
        endTime: '2022-03-29T06:00:00-04:00',
        isDaytime: false,
        temperature: 23,
        temperatureUnit: 'F',
        temperatureTrend: null,
        windSpeed: '7 to 18 mph',
        windDirection: 'NW',
        icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
        shortForecast: 'Mostly Clear',
        detailedForecast:
          'Mostly clear, with a low around 23. Northwest wind 7 to 18 mph, with gusts as high as 35 mph.',
      },
    ],
  },
};

describe('Weather forecast: Render', () => {
  test('input validation', async () => {
    var mockAxios = new MockAdapter(axios);
    render(<App />);
    expect(screen.getByText('Forecast for the week in USA')).toBeTruthy();

    const inputStreet = screen.getByPlaceholderText('Insert street');
    const inputCity = screen.getByPlaceholderText('Insert city');
    const inputState = screen.getByPlaceholderText('Insert state');
    fireEvent.change(inputStreet, {
      target: { value: '121 S fremont ave' },
    });
    fireEvent.change(inputCity, {
      target: { value: 'baltimore' },
    });
    fireEvent.change(inputState, {
      target: { value: '' },
    });

    await waitFor(() => {
      //@ts-ignore
      expect(inputStreet.value).toBe('121 S fremont ave');
    });
    //@ts-ignore
    expect(inputCity.value).toBe('baltimore');
    //@ts-ignore
    expect(inputState.value).toBe('');
    // Shows the error
    expect(screen.getByText('required to complete the state')).toBeTruthy();

    fireEvent.change(inputState, {
      target: { value: 'asdfg' },
    });
    await waitFor(() => {
      // Shows the error
      expect(screen.getByText('Max lenght 2')).toBeTruthy();
    });

    fireEvent.change(inputState, {
      target: { value: 'MD' },
    });

    await waitFor(() => {
      //@ts-ignore
      expect(inputState.value).toBe('MD');
    });
    fireEvent.submit(screen.getByText('Search'));

    await waitFor(() => {
      mockAxios
        .onGet(
          //@ts-ignore
          `https://geocoding.geo.census.gov/geocoder/locations/address?street=${inputStreet.value}&city=${inputCity.value}&state=${inputState.value}&benchmark=2020&format=json`,
        )
        .reply(200, getGeocodingLatitudeLongitudeResp);
      mockAxios
        .onGet(`https://api.weather.gov/points/39.286522,-76.62757`)
        .reply(200, getPointsMock);
      mockAxios
        .onGet(
          //@ts-ignore
          `${getPointsMock.properties.forecastGridData}/forecast`,
        )
        .reply(200, getForestcastMock);
    });

    expect(screen.getByText('Monday')).toBeTruthy();
    expect(screen.getAllByText('Mon 28/03').length).toBe(2);
    expect(screen.getByText('Temperature: 40 F')).toBeTruthy();

    expect(screen.getByText('Monday Night')).toBeTruthy();
    expect(screen.getByText('Temperature: 23 F')).toBeTruthy();
  });
});
