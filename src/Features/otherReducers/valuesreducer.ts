
import { createSlice, PayloadAction } from 'redux-starter-kit';

export type lastValues = {
  lastValues:[]
};
export type ApiErrorAction = {
  error: string;
};
const initialState = {
  getlastValues:[] as object [],
}

const slice = createSlice({
  name: 'lastValuesRedu',
  initialState,
  reducers: {
    GetLastValues: (state, action: PayloadAction<lastValues>) => {
      const { lastValues } = action.payload;
      state.getlastValues = lastValues;      
    },
    LastValApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});
export const reducer = slice.reducer;
export const actions = slice.actions;
