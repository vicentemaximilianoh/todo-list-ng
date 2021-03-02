import {uniqueId} from 'lodash';

import { Component, OnInit } from '@angular/core';

import TodoItem from '../models/TodoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: TodoItem[] = [];
  public todoText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(): void {
    const newItem: TodoItem = {
      text: this.todoText,
      id: uniqueId()
    };

    this.todos.push(newItem);

    this.todoText = '';
  }

  deleteItem(id: string): void {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });
  }

}
