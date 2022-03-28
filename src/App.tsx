import React, { useState } from 'react';
import './App.css';
import { getForestcast, getGeocodingLatitudeLongitude, getPoints } from './api';
import SectionView from './components/SectionView/SectionView';
import FilterSearch, {
  FormValues,
} from './components/FilterSearch/FilterSearch';
import ForecastGrid from './components/ForescastGrid/ForescastGrid';
import { ForecastGridDTO } from './components/ForescastGrid/ForescastDTO';

type State = {
  forecastGrid: Array<ForecastGridDTO>;
  searched: boolean;
  loading: boolean;
};

function App() {
  const [state, setState] = useState<State>({
    forecastGrid: [],
    searched: false,
    loading: false,
  });

  const searchCity = async ({ street, city, state }: FormValues) => {
    await getGeocodingLatitudeLongitude(street, city, state)
      .then((res) => {
        getPoints(res.y, res.x).then((forecastGridDataUrl) => {
          getForestcast(forecastGridDataUrl).then((data) => {
            setState({ forecastGrid: data, searched: true, loading: false });
          });
        });
      })
      .catch((e) => {
        setState({ forecastGrid: [], searched: true, loading: false });
      });
  };

  return (
    <div className="App">
      <SectionView
        title="Forecast for the week in USA"
        filtersComponent={
          <FilterSearch
            handleSearch={(searchForm: FormValues) => {
              setState({ ...state, loading: true });
              searchCity(searchForm);
            }}
          />
        }
        searched={state.searched}
        loading={state.loading}
        hasResults={state.forecastGrid.length > 0}
      >
        <ForecastGrid results={state.forecastGrid} />
      </SectionView>
    </div>
  );
}

export default App;
