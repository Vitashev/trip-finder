import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MatCardModule} from '@angular/material';
import {ComponentsModule} from './components';
import {TripEffects} from './effects/trip';
import {reducers} from './reducers';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TripListComponent} from './components/trip-list';
import {TripService} from './services/trip.service';
import {SearchService} from './services/search.service';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    ComponentsModule,
    RouterModule.forChild([
      {path: '', component: TripListComponent},
    ]),
    StoreModule.forFeature('trip', reducers),
    EffectsModule.forFeature([TripEffects])

  ],
  providers: [TripService, SearchService]
})
export class TripModule {
}
