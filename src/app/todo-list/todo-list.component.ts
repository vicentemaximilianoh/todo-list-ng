import {uniqueId} from 'lodash';

import { Component, ElementRef, EventEmitter, Input, IterableDiffer, IterableDiffers, Output, ViewChild } from '@angular/core';

import TodoItem from '../models/TodoItem';
import TodoFilter from '../models/TodoFilter';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @ViewChild('todoInput', {static: true}) todoInput: ElementRef;
  @Input() todos: TodoItem[];
  @Input() filters: TodoFilter[];

  public todoText: string = '';
  private selectedItem: TodoItem = null;

  constructor(public todoListService: TodoListService) {}

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
    this.todoInput.nativeElement.focus();
  }

  deleteItem(id: string): void {
    this.todoListService.deleteItem(id);
  }

  toggleCompleted(item: TodoItem) {
    this.todoListService.toggleCompleted(item);
  }
}
