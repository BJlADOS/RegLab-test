import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouteLinkHeaderComponent } from './components/route-link-header/route-link-header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { ShortDescriptionPipe } from './pipes/short-description/short-description.pipe';
import { SelectWithRadioComponent } from './components/select-with-radio/select-with-radio.component';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { AutoResizeTextareaDirective } from './directives/auto-resize-textarea/auto-resize-textarea.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    RouteLinkHeaderComponent,
    BreadcrumbComponent,
    ShortDescriptionPipe,
    SelectWithRadioComponent,
    ClickOutsideDirective,
    AutoResizeTextareaDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    ShortDescriptionPipe,
    SelectWithRadioComponent,
    AutoResizeTextareaDirective,
    ClickOutsideDirective,
  ]
})
export class SharedModule { }
