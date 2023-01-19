import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() item!: IItem;
  @Input() windowWidth!: number;

  constructor(
    private _router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public toItem(): void {
    this._router.navigate([`/items/${this.item.id}`]);
  }

  public buy(): void {
    console.log('buy');
  }

}
