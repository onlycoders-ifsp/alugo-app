import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelLocadorComponent } from './aluguel-locador.component';

describe('AluguelLocadorComponent', () => {
  let component: AluguelLocadorComponent;
  let fixture: ComponentFixture<AluguelLocadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluguelLocadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelLocadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
