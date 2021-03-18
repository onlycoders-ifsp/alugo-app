import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRendimentosComponent } from './cliente-rendimentos.component';

describe('ClienteRendimentosComponent', () => {
  let component: ClienteRendimentosComponent;
  let fixture: ComponentFixture<ClienteRendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteRendimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteRendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
