import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import TodoItem from '../models/TodoItem';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem;
  @Output() deleteItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteItem(value: string) {
    this.deleteItemEvent.emit(value);
  }

}
