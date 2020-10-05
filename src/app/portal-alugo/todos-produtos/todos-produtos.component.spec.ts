import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProdutosComponent } from './todos-produtos.component';

describe('TodosProdutosComponent', () => {
  let component: TodosProdutosComponent;
  let fixture: ComponentFixture<TodosProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
