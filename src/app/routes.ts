import {Routes} from '@angular/router';

import {NotFoundPageComponent} from './core/components/not-found-page';

export const routes: Routes = [
  {path: '', redirectTo: '/trip', pathMatch: 'full'},
  {
    path: 'trip',
    loadChildren: './trip/trip.module#TripModule'
  },
  {path: '**', component: NotFoundPageComponent},
];
