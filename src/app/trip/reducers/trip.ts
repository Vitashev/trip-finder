import * as trip from '../actions/trip';
import {Trip, SearchFilter, SearchParams} from '../models/index';
import * as _ from 'lodash';
import {SearchService} from '../services/search.service';

const searchService = new SearchService();

export interface State {
  tripsList: Array<Trip>;
  searchParams: SearchParams;
  searchFilter: SearchFilter;
  cheapestPath: any;
  fastestPath: any;
}

const initialState: State = {
  tripsList: [],
  searchParams: {
    departure: [],
    arrival: []
  },
  cheapestPath: [],
  fastestPath: [],
  searchFilter: {
    departure: '',
    arrival: '',
    cheapest: false,
    fastest: false
  }
};

export function reducer(state = initialState,
                        action: trip.Actions): State {
  switch (action.type) {
    case trip.GET_TRIP_LIST_SUCCESS: {
      const searchParams = searchService.getSearchParams(action.payload);
      const pathes = searchService.getPathes(action.payload);

      const cheapestPath = pathes.cheapest;
      const fastestPath = pathes.fastest;

      return {
        ...state,
        searchParams,
        cheapestPath,
        fastestPath,
        tripsList: action.payload,
      };
    }

    case trip.SET_SEARCH_FILTER: {
      return {
        ...state,
        searchFilter: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getTripList = (state: State) => {
  let trips = {list: state.tripsList, totalDuration: 0, totalCost: 0};

  if (!_.isEmpty(state.cheapestPath) && !_.isEmpty(state.fastestPath)) {
    if (state.searchFilter.cheapest) {
      const cheapest = searchService.getShortestPath(state.cheapestPath, state.searchFilter.departure, state.searchFilter.arrival);
      trips = searchService.getCheapestTrip(state.tripsList, cheapest[0])
    } else if (state.searchFilter.fastest) {
      const fastest = searchService.getShortestPath(state.fastestPath, state.searchFilter.departure, state.searchFilter.arrival);
      trips = searchService.getFastestTrip(state.tripsList, fastest[0])
    }
  }

  return trips;
};

export const getSearchParams = (state: State) => {
  return state.searchParams;
};

