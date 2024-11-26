import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remise',
  standalone: true
})
export class RemisePipe implements PipeTransform {

  transform(x: number): number {
    return x + Math.floor(x * 0.10);
  }

}
