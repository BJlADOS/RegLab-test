import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IItem, IItemPage } from 'src/app/interfaces/item';
import { IFilterRequest } from 'src/app/interfaces/search';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private _http: HttpClient,
  ) { }

  public getProducts(filters?: IFilterRequest): Observable<IItemPage> {
    const filtersQuery = {...filters};
    return this._http.get<IItemPage>(`${environment.apiUrl}/products`, { params: filtersQuery });
  }

  public seacrhProducts(filters: IFilterRequest): Observable<IItemPage> {
    const filtersQuery = {...filters};
    return this._http.get<IItemPage>(`${environment.apiUrl}/products/search`, { params: filtersQuery });
  }

  public getProduct(id: number): Observable<IItem> {
    return this._http.get<IItem>(`${environment.apiUrl}/products/${id}`);
  }

  public getItemName(id: number): Observable<string> {
    return this._http.get<IItem>(`${environment.apiUrl}/products/${id}?select=title`).pipe(map((item: IItem) => item.title));
  }

  public editProduct(id: number, data: IItem): Observable<IItem> {
    return this._http.put<IItem>(`${environment.apiUrl}/products/${id}`, data);
  }
}
