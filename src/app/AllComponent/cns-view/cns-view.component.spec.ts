import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnsViewComponent } from './cns-view.component';

describe('CnsViewComponent', () => {
  let component: CnsViewComponent;
  let fixture: ComponentFixture<CnsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
