import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizaAluguelComponent } from './realiza-aluguel.component';

describe('RealizaAluguelComponent', () => {
  let component: RealizaAluguelComponent;
  let fixture: ComponentFixture<RealizaAluguelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizaAluguelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizaAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
