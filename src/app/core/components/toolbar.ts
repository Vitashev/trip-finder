import { Component } from '@angular/core';

@Component({
  selector: 'tf-toolbar',
  template: `
    <mat-toolbar color="primary">
      <ng-content></ng-content>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {}
