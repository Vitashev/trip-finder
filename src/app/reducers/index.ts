import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import {RouterStateUrl} from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';

import {storeFreeze} from 'ngrx-store-freeze';

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};


export const metaReducers: MetaReducer<State>[] = [storeFreeze];

