import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteReporteProblemaComponent } from './cliente-reporte-problema.component';

describe('ClienteReporteProblemaComponent', () => {
  let component: ClienteReporteProblemaComponent;
  let fixture: ComponentFixture<ClienteReporteProblemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteReporteProblemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteReporteProblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
