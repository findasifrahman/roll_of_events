import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonyAddComponent } from './synony-add.component';

describe('SynonyAddComponent', () => {
  let component: SynonyAddComponent;
  let fixture: ComponentFixture<SynonyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynonyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
