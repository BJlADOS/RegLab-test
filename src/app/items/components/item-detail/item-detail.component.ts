import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';
import { format } from 'path';
import { contentExpansion } from 'src/app/animations/content-expansion/content-expansion';
import { contentExpansionHorizontal } from 'src/app/animations/content-expansion/content-expansion-horizontal';
import { IItem } from 'src/app/interfaces/item';
import { FormGeneratorService } from 'src/app/services/form-generator/form-generator.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  animations: [contentExpansionHorizontal, contentExpansion],
})
export class ItemDetailComponent implements OnInit {

  public itemForm!: UntypedFormGroup;
  public item?: IItem;

  public isEditing: boolean = false;
  public isUserChanged: { title: boolean, description: boolean, price: boolean } = { title: false, description: false, price: false };
  public isSaved: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _item: ItemService,
    private _form: FormGeneratorService,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this._item.getProduct(params['id']).subscribe((item) => {
        console.log(item);
        this.itemForm = this._form.getItemForm(item);
        this.item = item;
        this.itemForm.disable();
      });
    });   
  }

  public edit(): void {
    this.isEditing = true;
    this.isSaved = false;
    this.itemForm.enable();
  }
  
  public cancelEdit(): void {
    this.isEditing = false;
    this.resetForm();
  }

  public editItem(): void {
    this._item.editProduct(this.item!.id, this.itemForm.value).subscribe((item) => {
      this.item = item;
      this.isEditing = false;
      this.isSaved = true;
      this.resetForm();
    });

  }

  public checkChanges(): boolean {
    const form = this.itemForm.value;
    this.isUserChanged.title = form.title !== this.item?.title;
    this.isUserChanged.description = form.description !== this.item?.description;
    this.isUserChanged.price = form.price !== this.item?.price;

    return this.isUserChanged.title || this.isUserChanged.description || this.isUserChanged.price;
  }

  private resetForm(): void {
    this.itemForm.reset(this.item);
    this.itemForm.disable();
  }

}
