import { createSlice, PayloadAction } from 'redux-starter-kit';

export type WeatherForLocation = {
  description: string;
  locationName: string;
  temperatureinCelsius: number;
};

export type ApiErrorAction = {
  error: string;
};

export type ApiMetrics ={
    metrics: any
}

const initialState = {
  metrics:[]
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    getMetrics: (state, action: PayloadAction<ApiMetrics>) => {
      const { metrics } = action.payload;
      state.metrics = metrics;
    },
    addMetric: (state, action: PayloadAction<ApiErrorAction>) => state,
    deleteMetric:(state , action: PayloadAction<ApiErrorAction> )=> state
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
