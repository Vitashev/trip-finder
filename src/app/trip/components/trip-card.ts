import {Component, Input} from '@angular/core';
import {Trip} from '../models';

@Component({
  selector: 'tf-trip-card',
  template: `
    <mat-card fxLayout="column">
      <div fxFlex fxLayout="row" fxLayoutAlign="space-between center" class="trip-title">
          <div>{{trip.departure}} > {{trip.arrival}}</div>
          <div class="trip-price">{{trip.cost}} &euro;</div>
      </div>
      <div fxFlex fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px" class="trip-desc">
          <div>transport: {{trip.transport}}</div>
          <div>reference: {{trip.reference}}</div>
          <div>duration: {{trip.duration.h}}:{{trip.duration.m}}</div>
      </div>

    </mat-card>
  `,
  styles: [
    `
    .trip-title {
      font-weight: bold;
      font-size: 16px;
    }
    
    .trip-price {
      color: #4CAF50;
    }
    
    .trip-desc {
      font-style: italic;
    }
    
    mat-card {
      width: 500px;
      height: 100px;
      margin: 5px;
    }

    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    
  `,
  ]
})
export class TripCardComponent {
  @Input() trip: any;

  constructor() {
  }

}
