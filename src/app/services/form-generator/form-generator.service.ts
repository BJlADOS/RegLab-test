import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IItem } from 'src/app/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  private _fb: FormBuilder = new FormBuilder();

  constructor() { }

  public getItemForm(item?: IItem): FormGroup {
    return this._fb.group({
      title: new FormControl(item?.title?? '', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl(item?.description?? '', Validators.compose([
        Validators.required,
      ])),
      price: new FormControl(item?.price?? null, Validators.compose([
        Validators.required,
      ])),
    })
  }

  public getSortForm(): FormGroup {
    return this._fb.group({
      sort: new FormControl('asc'),
    })
  }

  public getSearchForm(): FormGroup {
    return this._fb.group({
      search: new FormControl(''),
    })
  }
}
