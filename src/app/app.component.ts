import { ChangeDetectionStrategy, Component } from '@angular/core';
import TodoFilter from './models/TodoFilter';
import TodoItem from './models/TodoItem';
import { TodoListService } from './services/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public todos: TodoItem[] = [];
  public filteredTodos: TodoItem[] = [];
  public filters: TodoFilter[] = [];
  
  constructor(public todoListService: TodoListService) {}

  /* Filter features */
  setFilter(filter: TodoFilter) {
    this.todoListService.setFilter(filter);
  }

  getTodos() {
    return this.todoListService.getTodos();
  }

  getFilters() {
    return this.todoListService.getFilters();
  }

}
