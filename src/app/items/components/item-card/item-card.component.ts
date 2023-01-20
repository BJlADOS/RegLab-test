import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() item!: IItem;
  @Input() windowWidth!: number;

  constructor(
    private _router: Router,
  ) { }

  public buy(): void {
    console.log('buy');
  }

}
