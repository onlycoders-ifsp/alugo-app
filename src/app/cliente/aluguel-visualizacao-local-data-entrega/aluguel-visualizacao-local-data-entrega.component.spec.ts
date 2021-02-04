import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelVisualizacaoLocalDataEntregaComponent } from './aluguel-visualizacao-local-data-entrega.component';

describe('AluguelVisualizacaoLocalDataEntregaComponent', () => {
  let component: AluguelVisualizacaoLocalDataEntregaComponent;
  let fixture: ComponentFixture<AluguelVisualizacaoLocalDataEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluguelVisualizacaoLocalDataEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelVisualizacaoLocalDataEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
