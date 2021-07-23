import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastcnslistComponent } from './pastcnslist.component';

describe('PastcnslistComponent', () => {
  let component: PastcnslistComponent;
  let fixture: ComponentFixture<PastcnslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastcnslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastcnslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
