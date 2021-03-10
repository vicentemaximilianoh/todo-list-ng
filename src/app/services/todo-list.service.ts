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

    this.todos.push(newItem);
  }

  editItem(todoItem: TodoItem, todoText: string) {
    let idxItem: number = this.getIndexItem(todoItem);
  
    this.todos[idxItem].text = todoText;
  }

  deleteItem(id: string) {
    const itemIdx = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(itemIdx, 1);
  }

  setItemAsComplete(item: TodoItem) {
    let idxItem: number = this.getIndexItem(item);

    this.todos[idxItem] = item;
  }

  setFilter(filter: TodoFilter) {
    const filterIdx: number = this.filters.findIndex((f) => {
      return f.type === filter.type;
    });

    if (filterIdx !== -1) {
      this.filters[filterIdx] = filter;
    } else {
      this.filters.push(filter);
    }
  }

  filterList(filters: TodoFilter[]) {
    const filteredTodos = [];
    this.todos.forEach((todo) => {

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
