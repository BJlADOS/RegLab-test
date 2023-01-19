import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItemPage } from 'src/app/interfaces/item';
import { IFilter, IFilterRequest } from 'src/app/interfaces/search';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class SearchItemsService {

  public itemsSubject$: BehaviorSubject<IItemPage> = new BehaviorSubject<IItemPage>({ total: 0, limit: 0, skip: 0, products: [] });
  public items$ = this.itemsSubject$.asObservable();

  private _filterRequest: IFilterRequest = {
    category: '',
    q: '',
    skip: 0,
    limit: 20,
    brand: '',
    select: '',
  };

  constructor(
    private _item: ItemService,
  ) { }

  public search(search?: string): void {
    this._filterRequest.q = search;
    this._filterRequest.skip = 0;
    this.makeSearch();
  }

  public setFilters(filters: IFilter): void {
    this._filterRequest.category = filters.category;
    this._filterRequest.brand = filters.brand;
    this._filterRequest.select = filters.select;
    this._filterRequest.skip = 0;
    this.makeSearch();
  }

  public resetAll(): void {
    this._filterRequest = {
      category: '',
      q: '',
      skip: 0,
      limit: 20,
      brand: '',
      select: '',
    };
    this.itemsSubject$.next({ total: 0, limit: 0, skip: 0, products: [] });
  }

  public loadMore(): void {
    if ((this._filterRequest.skip! + this._filterRequest.limit!) >= this.itemsSubject$.value.total) {
      return;
    }
    this._filterRequest.skip! += this._filterRequest.limit!;
    this.makeSearch();
  }

  private makeSearch(): void {
    if (this._filterRequest.q) {
      this._item.seacrhProducts(this.buildRequestObject()).subscribe((res: IItemPage) => {
        this.itemsSubject$.next(res);
      });
    } else {
      this._item.getProducts(this.buildRequestObject()).subscribe((res: IItemPage) => {
        this.itemsSubject$.next(res);
      });
    }
  }

  private buildRequestObject(): IFilterRequest {
    const request: any = {};

    Object.keys(this._filterRequest).forEach((key, i) => {
      if (Object.values(this._filterRequest)[i]) {
        if (Array.isArray(Object.values(this._filterRequest)[i])) {
          if (Object.values(this._filterRequest)[i].length === 0) {
            return;
          }
          request[key] = Object.values(this._filterRequest)[i].map((item: any) => item.id);
        } else {
          request[key] = Object.values(this._filterRequest)[i];
        }

      }
    });

    return request;
  }


}
