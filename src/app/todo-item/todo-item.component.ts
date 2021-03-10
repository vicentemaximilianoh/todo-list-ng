import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import TodoItem from '../models/TodoItem';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() item: TodoItem;
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() editItemEvent = new EventEmitter<TodoItem>();

  constructor() { }

  editItem(item: TodoItem) {
    this.editItemEvent.emit(item);
  }

  deleteItem(id: string) {
    this.deleteItemEvent.emit(id);
  }

}
