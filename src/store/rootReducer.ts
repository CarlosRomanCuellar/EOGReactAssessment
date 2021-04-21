import { reducer as weatherReducer } from '../Features/Weather/reducer';
import {reducer as metricReducer} from '../Features/Metrix/reducer' //'../Features/Metrics/reducer'
import { combineReducers } from 'redux-starter-kit';
import { reducer as lastValuesReducer } from '../Features/otherReducers/valuesreducer'


 const rootReducer= combineReducers({
    weather: weatherReducer,
    metrics: metricReducer,
    lastValues: lastValuesReducer
  });

  export default rootReducer;