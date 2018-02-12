import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatCardModule, MatButtonModule, MatStepperModule, MatNativeDateModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatDatepickerModule, MatIconModule,
  MatRadioModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';

import {TripListComponent} from './trip-list';
import {TripCardComponent} from './trip-card';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {PipesModule} from '../../shared/pipes';

export const COMPONENTS = [
  TripListComponent,
  TripCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}

