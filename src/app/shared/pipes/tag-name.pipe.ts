import {Pipe, PipeTransform} from '@angular/core';
import {Tag} from '../../core/models/tag';

@Pipe({
  name: 'tagName'
})
export class TagNamePipe implements PipeTransform {

  transform(tag: Tag, args?: any): string {
    const categoryName = tag.name;
    const nameParts = categoryName.split('_');
    return nameParts.map(n => this.capitalizeFirstLetter(n)).join(' ');
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
