import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLinkHeaderComponent } from './route-link-header.component';

describe('RouteLinkHeaderComponent', () => {
  let component: RouteLinkHeaderComponent;
  let fixture: ComponentFixture<RouteLinkHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteLinkHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLinkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
