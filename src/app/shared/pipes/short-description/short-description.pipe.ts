import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    const length = 110;
    return value.length > length ? value.slice(0, length) + '...' : value;
  }

}
