import { IState } from '../../store';

export const getMetrics = (state: IState) => {
    const metrics = state.metrics;
    return metrics;
  };

export const getLastValues = (state: IState) => {
  const lastValues = state.lastValues
  return lastValues
}
  