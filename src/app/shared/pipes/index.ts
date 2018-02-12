import {NgModule} from '@angular/core';
import {TimeFromMinutesPipe} from './time-from-minutes';

export const PIPES = [TimeFromMinutesPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {
}
