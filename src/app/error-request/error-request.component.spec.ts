import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRequestComponent } from './error-request.component';

describe('ErrorRequestComponent', () => {
  let component: ErrorRequestComponent;
  let fixture: ComponentFixture<ErrorRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
