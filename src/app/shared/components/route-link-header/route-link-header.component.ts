import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-link-header',
  templateUrl: './route-link-header.component.html',
  styleUrls: ['./route-link-header.component.scss']
})
export class RouteLinkHeaderComponent {

  @Input() routeLink: string = '';
  @Input() title: string = '';

  constructor(
    private _router: Router,
  ) { }

  public isActive(): boolean {
    return this._router.url === this.routeLink;
  }

}
