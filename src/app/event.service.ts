import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Event } from './event';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = 'api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl).pipe(catchError(this.handleError('getHeroes', [])));
  }

  addEvent (event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event, httpOptions);
  }

  deleteEvent (event: Event | number): Observable<Event> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.eventsUrl}/${id}`;
 
    return this.http.delete<Event>(url, httpOptions).pipe(
      catchError(this.handleError<Event>('deleteEvent'))); 
  }

  updateEvent (event: Event): Observable<any> {
    return this.http.put(this.eventsUrl, event, httpOptions);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

        
      

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
