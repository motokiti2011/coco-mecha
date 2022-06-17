import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistDetailComponent } from './mylist-detail.component';

describe('MylistDetailComponent', () => {
  let component: MylistDetailComponent;
  let fixture: ComponentFixture<MylistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylistDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
