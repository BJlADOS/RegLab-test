import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
];

export const appRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);

