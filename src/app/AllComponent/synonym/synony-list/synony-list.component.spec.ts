import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonyListComponent } from './synony-list.component';

describe('SynonyListComponent', () => {
  let component: SynonyListComponent;
  let fixture: ComponentFixture<SynonyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynonyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
