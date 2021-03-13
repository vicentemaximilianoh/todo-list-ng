import { TestBed } from '@angular/core/testing';
import { TodoListService } from 'src/app/services/todo-list.service';
import { TodosFilterPipe } from './todos-filter.pipe';

describe('TodosFilterPipe', () => {
  let todoListService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [TodoListService]
    });
    todoListService = TestBed.inject(TodoListService);
  });

  it('create an instance', () => {
    const pipe = new TodosFilterPipe(todoListService);
    expect(pipe).toBeTruthy();
  });
});
