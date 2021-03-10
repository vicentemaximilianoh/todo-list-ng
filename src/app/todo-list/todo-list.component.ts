import {uniqueId} from 'lodash';

import { Component, IterableDiffer, IterableDiffers } from '@angular/core';

import TodoItem from '../models/TodoItem';
import TodoFilter from '../models/TodoFilter';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  public todos: TodoItem[] = [];
  public filteredTodos: TodoItem[] = [];
  public todoText: string = '';
  public filters: TodoFilter[] = [];
  public iterableDiffer: IterableDiffer<any>;

  private selectedItem: TodoItem = null;

  ngOnInit(): void {
    this.todos = this.todoListService.getTodos();
    this.filters = this.todoListService.getFilters();
  }
  
  constructor(private iterableDiffers: IterableDiffers, public todoListService: TodoListService) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  // Todo list needs to be filtered immediately when collection items of filters are changed.
  ngDoCheck() {
      let todoChanges = this.iterableDiffer.diff(this.todos);
      let filterChanges = this.iterableDiffer.diff(this.filters);

      if (todoChanges || filterChanges) {
          this.filterList();
      }
  }

  /* Todo items features */
  saveTodo(): void {
    if (this.selectedItem !== null) {
      this.todoListService.editItem(this.selectedItem, this.todoText);
    } else {
      this.todoListService.addTodo(this.todoText);
    }

    // Clear UI.
    this.todoText = '';
    this.selectedItem = null;
  }

  editItem(item: TodoItem): void {
    this.todoText = item.text;
    this.selectedItem = item;
  }

  deleteItem(id: string): void {
    this.todoListService.deleteItem(id);
  }

  /* Filter features */
  setFilter(filter: TodoFilter) {
    this.todoListService.setFilter(filter);
  }

  private filterList() {
    this.filteredTodos = this.todoListService.filterList(this.filters);
  }

}
