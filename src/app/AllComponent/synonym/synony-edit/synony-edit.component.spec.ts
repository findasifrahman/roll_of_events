import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonyEditComponent } from './synony-edit.component';

describe('SynonyEditComponent', () => {
  let component: SynonyEditComponent;
  let fixture: ComponentFixture<SynonyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynonyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
