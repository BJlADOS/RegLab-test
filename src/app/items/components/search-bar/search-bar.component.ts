import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs';
import { contentExpansionHorizontal } from 'src/app/animations/content-expansion/content-expansion-horizontal';
import { getSortingRussianAsArray, ISelectOption, Sort } from 'src/app/interfaces/search';
import { DestroyService } from 'src/app/services/destroy/destroy.service';
import { FormGeneratorService } from 'src/app/services/form-generator/form-generator.service';
import { SearchItemsService } from 'src/app/services/search-items/search-items.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [contentExpansionHorizontal],
})
export class SearchBarComponent implements OnInit {

  public sort: ISelectOption[] = getSortingRussianAsArray();
  public sortForm: UntypedFormGroup = this._form.getSortForm();
  public searchForm: UntypedFormGroup = this._form.getSearchForm(); 

  @Output() madeSearch: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor(
    private _form: FormGeneratorService,
    private _destroy$: DestroyService,
    private _itemSearch: SearchItemsService,
  ) { }

  public ngOnInit(): void {
    this.searchForm.controls['search'].valueChanges
    .pipe(
      debounceTime(300),
      takeUntil(this._destroy$)
    )
    .subscribe(term => this.search(term));

    this.sortForm.controls['sort'].valueChanges
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(sort => {
      this.madeSearch.emit(sort.id);
      this._itemSearch.search(this.searchForm.value.search);
    });
  }

  public clearSearch(): void {
    this.searchForm.controls['search'].setValue('');
  }

  private search(term: string): void {
    this._itemSearch.search(term);
    this.madeSearch.emit(this.sortForm.value.sort);
  }

}
