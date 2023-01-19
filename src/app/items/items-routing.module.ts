import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemResolverService } from '../services/item-resolver/item-resolver.service';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemsMainComponent } from './components/items-main/items-main.component';

const routes: Routes = [
    { path: '', component: ItemsMainComponent, data: { breadcrumb: 'Товары' }, children: [
        { path: '', pathMatch: 'full', component: ItemListComponent, data: { breadcrumb: null } },
        { path: ':id', pathMatch: 'full', component: ItemDetailComponent, resolve: { breadcrumb: ItemResolverService } },
    ]},
];

export const itemsRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

