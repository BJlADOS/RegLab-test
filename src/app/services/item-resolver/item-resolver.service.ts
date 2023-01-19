import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, catchError } from 'rxjs';
import { IItem } from 'src/app/interfaces/item';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class ItemResolverService {

  constructor(
    private _item: ItemService,
    private _router: Router,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const itemId: string = route.paramMap.get('id') as string;
    return this._item.getProduct(+itemId).pipe(map((data: IItem) => data.title), catchError(() => this._router.navigate(['/items']))) as Observable<string>;
  }
}
