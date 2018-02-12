import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'tfTimeFromMinutes'})
export class TimeFromMinutesPipe implements PipeTransform {
  transform(minutes: number) {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;

    return ((h < 10) ? '0' + h : h) + 'h:' + ((m < 10) ? '0' + m : m) + 'm';
  }
}

