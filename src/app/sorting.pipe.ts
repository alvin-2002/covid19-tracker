import { Pipe, PipeTransform } from '@angular/core';
import { CountryDetail } from './model/country-details';

@Pipe({
  name: 'sorting',
  pure: false
})
export class SortingPipe implements PipeTransform {

  transform(value: any, col: string, direction: string): any{
    return (direction === 'Ascending') ? this.isAscending(value, col) : this.isDescending(value, col);
  }

  isAscending(value: CountryDetail[], col: string): CountryDetail[] {
    // return value.sort((a: any, b: any) => (a[col].toString()).localeCompare(b[col].toString()));
    return value.sort(function(a: any, b:any) {
      if (typeof a[col] === 'string') return (a[col].toString()).localeCompare(b[col].toString());
      return a[col] - b[col];
    });
  }

  isDescending(value: any, col: string):any {
    // return value.sort((a: any, b: any) => (b[col].toString()).localeCompare(a[col].toString()));
    return value.sort(function(a: any, b:any) {
      if (typeof a[col] === 'string') return (b[col].toString()).localeCompare(a[col].toString());
      return b[col] - a[col];
    });
  }

}
