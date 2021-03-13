import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: '1',
      text: 'Learn Angular',
      isCompleted: false
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper elements', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.todo-item-check')).toBeTruthy();
    expect(compiled.querySelector('.todo-item-text')).toBeTruthy();
    expect(compiled.querySelector('.todo-item-button')).toBeTruthy();
  });
});
