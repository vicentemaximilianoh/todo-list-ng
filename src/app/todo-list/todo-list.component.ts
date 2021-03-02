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
  private selectedItem: TodoItem = null;

  constructor() { }

  ngOnInit(): void {
  }

  saveTodo(): void {
    if (this.selectedItem !== null) {
      let idxItem: number = this.todos.findIndex((item) => {
        return this.selectedItem.id === item.id;
      });
  
      this.todos[idxItem].text = this.todoText;

    } else {
      const newItem: TodoItem = {
        text: this.todoText,
        id: uniqueId()
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

}
