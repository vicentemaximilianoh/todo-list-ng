import { Injectable } from '@angular/core';
import TodoItem from '../models/TodoItem';

import {uniqueId} from 'lodash';
import TodoFilter from '../models/TodoFilter';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todos: TodoItem[] = [];
  private filters: TodoFilter[] = [];

  constructor() { }

  getTodos() {
    return this.todos;
  }

  getFilters() {
    return this.filters;
  }

  addTodo(todoText: string) {
    const newItem: TodoItem = {
      id: uniqueId(),
      text: todoText,
      isCompleted: false
    };

    this.todos = [...this.todos, newItem];
  }

  editItem(todoItem: TodoItem, todoText: string) {
    let idxItem: number = this.getIndexItem(todoItem);
    todoItem.text = todoText;

    this.todos = [...this.todos];
    this.todos[idxItem] = todoItem;
  }

  deleteItem(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleCompleted(todoItem: TodoItem) {
    let idxItem: number = this.getIndexItem(todoItem);
    todoItem.isCompleted = !todoItem.isCompleted;

    this.todos = [...this.todos];
    this.todos[idxItem] = todoItem;
  }

  setFilter(filter: TodoFilter) {
    const filterIdx: number = this.filters.findIndex((f) => {
      return f.type === filter.type;
    });

    if (filterIdx !== -1) {
      this.filters = [...this.filters];
      this.filters[filterIdx] = filter;
    } else {
      this.filters = [...this.filters, filter];
    }
  }

  filterList(todos: TodoItem[], filters: TodoFilter[]) {
    const filteredTodos = [];
    todos.forEach((todo) => {

      let itemFiltered: boolean = true;
      if (filters.length > 0) {
        filters.forEach((filter) => {
          if (filter.type === 'STATUS') {
            if (filter.value === 'COMPLETED' && !todo.isCompleted) {
                itemFiltered = false;
            }

            if (filter.value === 'TO_DO' && todo.isCompleted) {
                itemFiltered = false;
            }
          }

            if (filter.type === 'TEXT' && !todo.text.toLowerCase().includes(filter.value.toLowerCase())) {
                itemFiltered = false;
            }

          });
      }

      if (itemFiltered) {
        filteredTodos.push(todo);
      }
    });

    return filteredTodos;
  }

  private getIndexItem(item: TodoItem): number {
    return this.todos.findIndex((i) => {
      return item.id === i.id;
    });
  }


}
