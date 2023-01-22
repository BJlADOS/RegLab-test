import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() item!: IItem;
  @Input() windowWidth!: number;

  constructor() { }

  public buy(): void {
    console.log('buy');
  }

}
