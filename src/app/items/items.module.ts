import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemsMainComponent } from './components/items-main/items-main.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { itemsRouting } from './items-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ItemListComponent,
    ItemsMainComponent,
    ItemCardComponent,
    ItemDetailComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    itemsRouting,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ItemsModule { }
