import { Component } from '@angular/core';

@Component({
  selector: 'tf-layout',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      
      
    }
    
    :host /deep/ a:link, a:visited, a:hover, a:active  {
        text-decoration: none;
    }
    
    :host /deep/ * {
      font-family: Roboto,"Helvetica Neue",sans-serif;
    }

  `,
  ],
})
export class LayoutComponent {}
