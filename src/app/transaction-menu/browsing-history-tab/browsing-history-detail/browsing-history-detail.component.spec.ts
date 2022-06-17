import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsingHistoryDetailComponent } from './browsing-history-detail.component';

describe('BrowsingHistoryDetailComponent', () => {
  let component: BrowsingHistoryDetailComponent;
  let fixture: ComponentFixture<BrowsingHistoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsingHistoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsingHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
