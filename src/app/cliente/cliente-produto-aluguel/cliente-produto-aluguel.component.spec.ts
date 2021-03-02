import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProdutoAluguelComponent } from './cliente-produto-aluguel.component';

describe('ClienteProdutoAluguelComponent', () => {
  let component: ClienteProdutoAluguelComponent;
  let fixture: ComponentFixture<ClienteProdutoAluguelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteProdutoAluguelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteProdutoAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
