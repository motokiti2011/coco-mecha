import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCompleteDetailComponent } from './transaction-complete-detail.component';

describe('TransactionCompleteDetailComponent', () => {
  let component: TransactionCompleteDetailComponent;
  let fixture: ComponentFixture<TransactionCompleteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCompleteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCompleteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
