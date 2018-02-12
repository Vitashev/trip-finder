import {createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromTrip from './trip';
import * as fromRoot from '../../reducers';

export interface TripState {
  trip: fromTrip.State;
}

export interface State extends fromRoot.State {
  'trip': TripState;
}

export const reducers = {
  trip: fromTrip.reducer,
};

export const getRootState = createFeatureSelector<TripState>('trip');

export const getTripState = createSelector(
  getRootState,
  (state: TripState) => state.trip
);

export const getTripList = createSelector(
  getTripState,
  fromTrip.getTripList
);

export const getSearchParams = createSelector(
  getTripState,
  fromTrip.getSearchParams
);

