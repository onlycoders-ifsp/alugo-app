import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGerenciaProdutosComponent } from './admin-gerencia-produtos.component';

describe('AdminGerenciaProdutosComponent', () => {
  let component: AdminGerenciaProdutosComponent;
  let fixture: ComponentFixture<AdminGerenciaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGerenciaProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGerenciaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
