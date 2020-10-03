import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProdutoComponent } from './cliente-produto.component';

describe('ClienteProdutoComponent', () => {
  let component: ClienteProdutoComponent;
  let fixture: ComponentFixture<ClienteProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
