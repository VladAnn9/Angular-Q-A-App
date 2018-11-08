import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Question } from './question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUrl = 'api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl).pipe(
      tap(questions => this.sortByLikes(questions)),
      catchError(this.handleError('getQuestions', [])));
  }

  deleteQuestion (question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    const url = `${this.questionsUrl}/${id}`;
    
    return this.http.delete<Question>(url, httpOptions).pipe(
      catchError(this.handleError<Question>('deleteQuestion')));
  }

  addQuestion (question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, httpOptions);
  }

  updateQuestion (question: Question): Observable<any> {
    return this.http.put(this.questionsUrl, question, httpOptions);
  }






  private sortByLikes (questions: Question[]): void {
    questions.sort((a: Question, b:Question) => b.likes - a.likes);
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
