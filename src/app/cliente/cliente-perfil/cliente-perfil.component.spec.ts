import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePerfilComponent } from './cliente-perfil.component';

describe('ClientePerfilComponent', () => {
  let component: ClientePerfilComponent;
  let fixture: ComponentFixture<ClientePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
