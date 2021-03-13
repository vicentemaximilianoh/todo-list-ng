import { Pipe, PipeTransform } from '@angular/core';

import TodoFilter from 'src/app/models/TodoFilter';
import TodoItem from 'src/app/models/TodoItem';
import { TodoListService } from 'src/app/services/todo-list.service';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  constructor(public todoListService: TodoListService) {}

  transform(items: TodoItem[], filters: TodoFilter[]): TodoItem[] {

    if (!items.length || !filters.length) {
      return items;
  }

    return this.todoListService.filterList(items, filters);
  }

}
