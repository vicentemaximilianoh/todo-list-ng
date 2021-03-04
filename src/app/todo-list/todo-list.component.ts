import {uniqueId} from 'lodash';

import { Component, IterableDiffer, IterableDiffers } from '@angular/core';

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
  iterableDiffer: IterableDiffer<any>;

  ngOnInit(): void {
    this.filterList();
  }
  
  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngDoCheck() {
      let todoChanges = this.iterableDiffer.diff(this.todos);
      let filterChanges = this.iterableDiffer.diff(this.filters);
      if (todoChanges || filterChanges) {
          // console.log('Changes detected!', todoChanges);
          this.filterList();
      }
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
  }

  editItem(item: TodoItem): void {
    this.todoText = item.text;
    this.selectedItem = item;
  }

  deleteItem(id: string): void {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });
  }

  setCompletedItem(item: TodoItem) {
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
