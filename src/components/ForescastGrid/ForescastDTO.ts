export type ForecastGridDTO = {
  number: number;
  name: string; //"Tonight",
  startTime: string; // "2022-03-26T19:00:00-04:00",
  endTime: string; //"2022-03-27T06:00:00-04:00",
  isDaytime: boolean;
  temperature: number; //36
  temperatureUnit: string; //"F",
  temperatureTrend: null;
  windSpeed: string; //"9 to 13 mph",
  windDirection: string; //'W';
  icon: string; //"https://api.weather.gov/icons/land/night/rain_showers,40/few?size=medium",
  shortForecast: string; //"Chance Rain Showers then Mostly Clear",
  detailedForecast: string; //"A chance of rain showers before 11pm. Mostly clear, with a low around 36. West wind 9 to 13 mph, with gusts as high as 22 mph. Chance of precipitation is 40%. New rainfall amounts less than a tenth of an inch possible."
};
