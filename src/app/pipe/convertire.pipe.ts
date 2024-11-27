import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertire',
  standalone: true
})
export class ConvertirePipe implements PipeTransform {

  transform(value:number): number {
    return Number((value*3.3).toFixed(3));
  }

}
