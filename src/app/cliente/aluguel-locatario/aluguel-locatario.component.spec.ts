import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelLocatarioComponent } from './aluguel-locatario.component';

describe('AluguelLocatarioComponent', () => {
  let component: AluguelLocatarioComponent;
  let fixture: ComponentFixture<AluguelLocatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluguelLocatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelLocatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
