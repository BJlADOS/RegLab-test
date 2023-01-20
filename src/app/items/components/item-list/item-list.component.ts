import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { IItem, IItemPage } from 'src/app/interfaces/item';
import { Sort } from 'src/app/interfaces/search';
import { SearchItemsService } from 'src/app/services/search-items/search-items.service';
import { SortService } from 'src/app/services/sort/sort.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {

  public columnsNumber: number = 2;
  public items: IItem[] = [];
  public sort: Sort = Sort.asc;
  
  public resizeObservable$!: Observable<Event>;
  public canScrollBack: boolean = false;

  private callback = this.throttle(this.checkPosition.bind(this), 250);
  private _destroy$: Subject<void> = new Subject<void>();
  private itemsAmount: number = 0;

  constructor(
    private _itemSearch: SearchItemsService,
    private _sort: SortService,
  ) { }

  public ngOnInit(): void {
    this._itemSearch.items$.pipe(takeUntil(this._destroy$)).subscribe((res: IItemPage) => {
      this.items = this._sort.sortItems(res.products.concat(this.items), this.sort);
      //this.items.push(...res.products);
      this.itemsAmount = res.total;
    });

    this._itemSearch.search();

    window.addEventListener('scroll', this.callback);
    window.addEventListener('resize', this.callback);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._itemSearch.resetAll();
    this.resetResults();

    window.removeEventListener('scroll', this.callback);
    window.removeEventListener('resize', this.callback);
  }

  public resetResults(): void {
    this.items = [];
    this.scrollBack();
  }

  public scrollBack(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public updateSearch(term: Sort): void {
    this.sort = term;
    this.resetResults();
  }

  private async checkPosition(): Promise<void> {
    const height: number = document.body.offsetHeight;
    const screenHeight: number = window.innerHeight;

    const scrolled: number = window.scrollY;

    const threshold: number = height - screenHeight / 4;

    const position: number = scrolled + screenHeight;

    this.canScrollBack = scrolled > 0;

    if (position >= threshold && this.items.length !== this.itemsAmount) {
      this._itemSearch.loadMore();
    }
  }

  private throttle(callee: Function, timeout: number): EventListener {
    let timer: NodeJS.Timeout | null = null;

    return function perform() {
      if (timer) { return; };

      timer = setTimeout(() => {
        callee();

        clearTimeout(timer!);
        timer = null;
      }, timeout);
    };
  }

}
