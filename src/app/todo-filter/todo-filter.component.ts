import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import TodoFilter from '../models/TodoFilter';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {

  @Input() filters: TodoFilter[] = [];
  @Output() setFilterEvent: EventEmitter<TodoFilter> = new EventEmitter<TodoFilter>();

  public textFilter: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  setFilter(filter: TodoFilter) {
    this.setFilterEvent.emit(filter);
  }

  isFilterActive(filterVal: string) {
    const statusType: string = 'STATUS';

    return !!(this.filters.length > 0) && !!this.filters.find((filter) => filter.type === statusType && filterVal === filter.value)
  }

}
