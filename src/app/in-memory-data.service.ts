import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from './event';
import { Question } from './question';

export class InMemoryDataService implements InMemoryDbService {
  createDb () {
    const events = [
      { id: 1, name: 'test', code: '2D2', date: Date.now() },
      { id: 2, name: 'test2', code: '3D3', date: Date.now() }
    ];
    const questions = [
      { id: 1, question: 'Lorem ipsum.', author: 'Vlad', likes: 0, replies: [], date: Date.now()},
      { id: 2, question: 'Lorem ipsum. Vlad Hey', author: 'Anna', likes: 0, replies: [], date: Date.now()}
    ];
    return {events, questions};
  }


  genId<T extends Event | Question>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}
