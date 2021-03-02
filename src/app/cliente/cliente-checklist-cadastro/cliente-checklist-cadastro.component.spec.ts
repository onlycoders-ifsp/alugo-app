import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteChecklistCadastroComponent } from './cliente-checklist-cadastro.component';

describe('ClienteChecklistCadastroComponent', () => {
  let component: ClienteChecklistCadastroComponent;
  let fixture: ComponentFixture<ClienteChecklistCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteChecklistCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteChecklistCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
