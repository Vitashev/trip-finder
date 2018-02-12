import { Action } from '@ngrx/store';
import {Trip, SearchFilter} from '../models';

export const GET_TRIP_LIST = '[GetTrip] GetTripList';
export const GET_TRIP_LIST_SUCCESS = '[GetTrip] GetTripList Success';
export const SET_SEARCH_FILTER = '[GetTrip] Set Search';

export class GetTripList implements Action {
  readonly type = GET_TRIP_LIST;
}

export class GetTripListSuccess implements Action {
  readonly type = GET_TRIP_LIST_SUCCESS;

  constructor(public payload: Array<Trip>) {}
}

export class SetSearchFilter implements Action {
  readonly type = SET_SEARCH_FILTER;

  constructor(public payload: SearchFilter) {}
}


export type Actions = GetTripList | GetTripListSuccess | SetSearchFilter;
