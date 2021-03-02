import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelLocalDataEntregaComponent } from './aluguel-local-data-entrega.component';

describe('AluguelLocalDataEntregaComponent', () => {
  let component: AluguelLocalDataEntregaComponent;
  let fixture: ComponentFixture<AluguelLocalDataEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluguelLocalDataEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelLocalDataEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
