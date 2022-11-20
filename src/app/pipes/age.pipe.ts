import { Pipe, PipeTransform } from '@angular/core';
import { differenceInYears } from 'date-fns';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(birthDate): number {
    let [day, month, year] = birthDate.split('/');
    const date = new Date(+year, month - 1, +day);

    return differenceInYears(date, new Date()) * -1;
  }
}
