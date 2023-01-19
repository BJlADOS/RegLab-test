import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { IItem } from 'src/app/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  private _fb: UntypedFormBuilder = new UntypedFormBuilder();

  constructor() { }

  public getItemForm(item?: IItem): UntypedFormGroup {
    return this._fb.group({
      title: new UntypedFormControl(item?.title?? '', Validators.compose([
        Validators.required,
      ])),
      description: new UntypedFormControl(item?.description?? '', Validators.compose([
        Validators.required,
      ])),
      price: new UntypedFormControl(item?.price?? null, Validators.compose([
        Validators.required,
      ])),
    })
  }

  public getSortForm(): UntypedFormGroup {
    return this._fb.group({
      sort: new UntypedFormControl('asc'),
    })
  }

  public getSearchForm(): UntypedFormGroup {
    return this._fb.group({
      search: new UntypedFormControl(''),
    })
  }
}
