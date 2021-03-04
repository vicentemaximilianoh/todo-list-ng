import {uniqueId} from 'lodash';

import { Component } from '@angular/core';

import TodoItem from '../models/TodoItem';
import TodoFilter from '../models/TodoFilter';

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

  private selectedItem: TodoItem = null;

  ngOnInit(): void {
    this.filterList();
  }

  saveTodo(): void {
    if (this.selectedItem !== null) {
      let idxItem: number = this.getIndexItem(this.selectedItem);
  
      this.todos[idxItem].text = this.todoText;

    } else {
      const newItem: TodoItem = {
        id: uniqueId(),
        text: this.todoText,
        isCompleted: false
      };
  
      this.todos.push(newItem);
    }

    this.todoText = '';
    this.selectedItem = null;

    this.filterList();
  }

  editItem(item: TodoItem): void {
    this.todoText = item.text;
    this.selectedItem = item;

    this.filterList();
  }

  deleteItem(id: string): void {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });

    this.filterList();
  }

  setCompletedItem(item: TodoItem) {
    let idxItem: number = this.getIndexItem(item);

    this.todos[idxItem] = item;
    
    this.filterList();
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

    this.filterList();
  }

  private getIndexItem(item: TodoItem): number {
    return this.todos.findIndex((i) => {
      return item.id === i.id;
    });
  }

  private filterList() {
    const filteredTodos = [];
    this.todos.forEach((todo) => {

      let itemFiltered: boolean = true;
      if (this.filters.length > 0) {
        this.filters.forEach((filter) => {
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
    this.filteredTodos = filteredTodos;
  }

}
