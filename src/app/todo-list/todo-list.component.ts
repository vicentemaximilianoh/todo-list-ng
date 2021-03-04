import {uniqueId} from 'lodash';

import { Component, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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

  differ: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {

  this.differ = this.differs.find({}).create();
  }

  ngOnInit(): void {
    this.filterList();
  }

  saveTodo(): void {
    if (this.selectedItem !== null) {
      let idxItem: number = this.todos.findIndex((item) => {
        return this.selectedItem.id === item.id;
      });
  
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

  setFilter(filter: TodoFilter) {
    const filterIdx: number = this.filters.findIndex((f) => {
      return f.type === filter.type;
    });
    if (filterIdx !== -1) {
      this.filters[filterIdx] = filter;
    } else {
      this.filters.push(filter);
    }
debugger;
    this.filterList();
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
