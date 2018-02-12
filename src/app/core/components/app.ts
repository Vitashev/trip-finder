import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tf-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tf-layout>
      <tf-toolbar>
        <div class="logo" [routerLink]="['/']">Trip Finder</div> 
      </tf-toolbar>

      <router-outlet></router-outlet>
    </tf-layout>
  `,
  styles: [`
    .logo:hover {
      cursor: pointer;
    }
  `]
})
export class AppComponent {}
