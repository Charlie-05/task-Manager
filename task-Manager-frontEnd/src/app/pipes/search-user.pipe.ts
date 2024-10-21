import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(value: any, ...args: string[]): any {

    let searchText: string = args[0];
    if (!searchText) {
      return value;
    }
    return value.filter((e: any) => e.title.toLowerCase().includes(searchText.toLowerCase()) || e.description.toLowerCase().includes(searchText.toLowerCase()))
  }

}
