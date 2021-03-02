import { Component, OnInit } from '@angular/core';

import TodoItem from '../models/TodoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: TodoItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.todos = this.getTodos();
  }

  private getTodos(): TodoItem[] {
    return [{
        text: 'todo 1',
      }, {
        text: 'todo 2',
      }, {
        text: 'todo 3'
      }
    ];
  }  

}
