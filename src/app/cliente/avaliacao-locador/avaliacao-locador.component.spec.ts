import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoLocadorComponent } from './avaliacao-locador.component';

describe('AvaliacaoLocadorComponent', () => {
  let component: AvaliacaoLocadorComponent;
  let fixture: ComponentFixture<AvaliacaoLocadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoLocadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoLocadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
