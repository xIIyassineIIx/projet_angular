import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'couvrer',
  standalone: true
})
export class CouvrerPipe implements PipeTransform {

  transform(value:string): string {
    return value.replace(/./g, '*');;
  }

}
