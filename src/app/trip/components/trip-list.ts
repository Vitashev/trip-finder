import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromTrip from '../reducers';
import * as trip from '../actions/trip';
import {SearchParams} from '../models';

@Component({
  selector: 'tf-trip-preview-list',
  template: `
    <mat-card >
        <form [formGroup]="searchFormGroup" fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
        <mat-form-field>
          <mat-select placeholder="From" formControlName="departure" required>
            <mat-option *ngFor="let departure of displayedSearchParams.departure" [value]="departure">
              {{ departure }}
            </mat-option>
          </mat-select>
         {{departure}}
        </mat-form-field>

        <mat-form-field>
          <mat-select placeholder="To" formControlName="arrival" required>
            <mat-option *ngFor="let arrival of displayedSearchParams.arrival" [value]="arrival">
              {{ arrival }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        
        <mat-radio-group formControlName="filterQuery" required>
          <mat-radio-button value="1">Cheapest</mat-radio-button>
          <mat-radio-button value="2">Fastest</mat-radio-button>
        </mat-radio-group>
        <button mat-raised-button color="accent" [disabled]="!searchFormGroup.valid" (click)="searchTrip()">Search</button>
        <button mat-raised-button color="accent" [disabled]="!searchFormGroup.valid" (click)="refreshSearch()">Refresh</button>
      </form>
    </mat-card>
   
    <div class="container">
      <div class="trip-list" fxLayout="column" fxLayoutAlign="start center" fxFlex="100%">
        <tf-trip-card *ngFor="let trip of tripData.list" [trip]="trip" class="col-md" fxFlex></tf-trip-card>
        <mat-card *ngIf="tripData.totalDuration && tripData.totalCost" class="trip-total">
          <div fxFlex fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="10px">
              <div>Total</div>
              <div>{{tripData.totalDuration | tfTimeFromMinutes}}</div>
              <div class="trip-price">{{tripData.totalCost}} &euro;</div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
    .trip-list {
        margin: 15px;
        overflow: auto;
        max-height: 70vh;
    }
    
    .trip-total {
        font-weight: bold;
        font-size: 16px;
        width: 500px;
        height: 100px;
        margin: 5px;
    }
    
    .trip-price {
      color: #4CAF50;
    }
  `,
  ]
})
export class TripListComponent implements OnInit {
  public tripData;
  public searchFormGroup: FormGroup;
  public displayedSearchParams: SearchParams;

  private searchParams: SearchParams;

  constructor(private store: Store<fromTrip.State>, private formBuilder: FormBuilder) {
    this.store.select(fromTrip.getTripList).subscribe(res=>{
      this.tripData = res;
    });

    this.store.select(fromTrip.getSearchParams).subscribe(res=>{
      this.searchParams = {...res};
      this.displayedSearchParams = {...res};
    });
  }

  ngOnInit() {
    this.store.dispatch(new trip.GetTripList());

    this.searchFormGroup = this.formBuilder.group({
        departure: ['', Validators.required],
        arrival: ['', Validators.required],
        filterQuery: ['', Validators.required],
      });

    this.searchFormGroup.get('departure').valueChanges.subscribe(val => {
      this.displayedSearchParams.arrival = this.searchParams.arrival.filter(item=>item !== val);
    });

    this.searchFormGroup.get('arrival').valueChanges.subscribe(val => {
      this.displayedSearchParams.departure = this.searchParams.departure.filter(item=>item !== val);
    });
  }

  public searchTrip() {
    const isCheapest = this.searchFormGroup.get('filterQuery').value === '1';

    this.store.dispatch(new trip.SetSearchFilter({
      departure: this.searchFormGroup.get('departure').value,
      arrival: this.searchFormGroup.get('arrival').value,
      cheapest: isCheapest,
      fastest: !isCheapest
    }));
  }

  public refreshSearch() {
    this.searchFormGroup.get('departure').setValue('');
    this.searchFormGroup.get('arrival').setValue('');
    this.searchFormGroup.get('filterQuery').setValue('');

    this.store.dispatch(new trip.SetSearchFilter({
      departure: '',
      arrival: '',
      cheapest: false,
      fastest: false
    }));
  }
}
