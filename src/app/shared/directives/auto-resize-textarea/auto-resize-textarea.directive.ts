import { Directive, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAutoResizeTextarea]'
})
export class AutoResizeTextareaDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  public onInput(event: Event): void {
    const element = event.target as HTMLElement;
    element.style.height = 'auto';
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
  }

}
