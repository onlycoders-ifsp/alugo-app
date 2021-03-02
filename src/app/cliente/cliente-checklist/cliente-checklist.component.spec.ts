import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteChecklistComponent } from './cliente-checklist.component';

describe('ClienteChecklistComponent', () => {
  let component: ClienteChecklistComponent;
  let fixture: ComponentFixture<ClienteChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
