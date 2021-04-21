
import { createSlice, PayloadAction } from 'redux-starter-kit';

export type metrics = {
  getMetrics:[],
  selectedMetric:[] 
  deleteSelected:""
};
export type ApiErrorAction = {
  error: string;
};
const initialState = {
  getMetrics:[] as string [],
  selectedMetrics:[] as string[] 
}

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    GetMetrics: (state, action: PayloadAction<metrics>) => {
      const { getMetrics } = action.payload;
      state.getMetrics = getMetrics;      
    },
    selectedMetrics:(state,action)=>{      
      const {selectedMetrics}=action.payload;    
      state.selectedMetrics=selectedMetrics
      state.getMetrics=state.getMetrics.filter(metric=>metric!==selectedMetrics[selectedMetrics.length-1])      
    },
    deleteSelected:(state,action)=>{
      const {deleteSelected}=action.payload;
      state.selectedMetrics=state.selectedMetrics.filter(metric=>metric!==deleteSelected)
      state.getMetrics.push(deleteSelected)
      
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});
export const reducer = slice.reducer;
export const actions = slice.actions;
