import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {trips} from './response';
import {Trip} from '../../trip/models/trip';


@Injectable()
export class TripService {

  constructor(private http: HttpClient) {
  }

  getTripList(): Observable<Array<Trip>> {
    return Observable.of(trips.deals);
  }

}
