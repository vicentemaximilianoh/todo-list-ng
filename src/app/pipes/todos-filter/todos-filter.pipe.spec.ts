import { TodosFilterPipe } from './todos-filter.pipe';

describe('TodosFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new TodosFilterPipe([]);
    expect(pipe).toBeTruthy();
  });
});
