import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import * as trip from '../actions/trip';
import {TripService} from '../services/trip.service';

@Injectable()
export class TripEffects {

  @Effect()
  getTripList$: Observable<Action> = this.actions$
    .ofType(trip.GET_TRIP_LIST)
    .switchMap(() =>
      this.tripService
        .getTripList()
        .map((res: any) => new trip.GetTripListSuccess(res))
        .catch(error => of(error))
    );

  constructor(private actions$: Actions, private tripService: TripService) {
  }
}
