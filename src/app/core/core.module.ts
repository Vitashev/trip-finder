import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {AppComponent} from './components/app';
import {NotFoundPageComponent} from './components/not-found-page';
import {LayoutComponent} from './components/layout';
import {ToolbarComponent} from './components/toolbar';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MatCardModule, MatToolbarModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule
    };
  }
}


