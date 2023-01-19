import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, Scroll, UrlSegment } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { contentExpansion } from 'src/app/animations/content-expansion/content-expansion';
import { IBreadcrumb } from 'src/app/interfaces/breadcrumb';
import { DestroyService } from 'src/app/services/destroy/destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [contentExpansion],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public breadcrumbs: IBreadcrumb[] = [];

  public burgerOpened: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _destroy$: DestroyService,
  ) { }

  public ngOnInit(): void {
    this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
    this._router.events
      .pipe(filter((event: RouterEvent | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll) => event instanceof NavigationEnd), takeUntil(this._destroy$))
      .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }

  public toLogIn(): void {
    console.log('toLogIn');
  }

  public toggleBurger(): void {
    this.burgerOpened = !this.burgerOpened;
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label: string = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
