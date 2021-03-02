import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.todos = this.getTodos();
  }

  private getTodos(): any[] {
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
