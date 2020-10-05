import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCredenciaisComponent } from './cliente-credenciais.component';

describe('ClienteCredenciaisComponent', () => {
  let component: ClienteCredenciaisComponent;
  let fixture: ComponentFixture<ClienteCredenciaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteCredenciaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCredenciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
