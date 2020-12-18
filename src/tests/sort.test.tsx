import sort from '../utils/sort';
import { Article } from '../interfaces/Article';

test('checking sorting', () => {
  let test: Array<Article> = [
    { date: '2. februar 2019', id:0, image:'', preamble:'', category:'', title:'' },
    { date: '1. oktober 2018', id:0, image:'', preamble:'', category:'', title:'' },
    { date: '5. mai 2019', id:0, image:'', preamble:'', category:'', title:'' },
  ]
  test = sort('asc', test);
  expect(test[2].date).toEqual('5. mai 2019');
  test = sort('dsc', test);
  expect(test[0].date).toEqual('5. mai 2019');
});
