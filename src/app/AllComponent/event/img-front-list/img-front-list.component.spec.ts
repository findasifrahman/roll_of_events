import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFrontListComponent } from './img-front-list.component';

describe('ImgFrontListComponent', () => {
  let component: ImgFrontListComponent;
  let fixture: ComponentFixture<ImgFrontListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgFrontListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgFrontListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
