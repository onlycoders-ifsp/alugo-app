import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoLocatarioComponent } from './avaliacao-locatario.component';

describe('AvaliacaoLocatarioComponent', () => {
  let component: AvaliacaoLocatarioComponent;
  let fixture: ComponentFixture<AvaliacaoLocatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoLocatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoLocatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
