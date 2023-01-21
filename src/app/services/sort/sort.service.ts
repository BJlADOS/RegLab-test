import { Injectable } from '@angular/core';
import { IItem } from 'src/app/interfaces/item';
import { Sort } from 'src/app/interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  public sortItems(items: IItem[], sort: Sort): IItem[] {
    switch (sort) {
      case 'asc':
        // sort by name ascending
        return items.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      case 'desc':
        // sort by name descending
        return items.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      case 'price_asc':
        // sort by price ascending
        return items.sort((a, b) => {
          return a.price - b.price;
        });
      case 'price_desc':
        // sort by price descending
        return items.sort((a, b) => {
          return b.price - a.price;
        });
      default:
        return items;
    }
  }
}
