import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faReply } from '@fortawesome/free-solid-svg-icons';


import { Question } from '../question';
import { QuestionService } from '../question.service';

import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  faComments = faComments;
  faReply = faReply;

  questions: Question[];

  eventQuestions: Question[];

  event: Event;

  isReply: any = {};

  id: Array<number> = [];

  counter: number = 0;

  constructor(
    private questionService: QuestionService,
    private eventService: EventService
    ) { }

  ngOnInit() {
    this.getEvent();
    this.getQuestions();
  }

  getQuestions(): void { 
    this.questionService.getQuestions().subscribe(q => this.questions = q);
  }

  getEvent(): void {
    this.eventService.getEvents().subscribe(events => this.event = events[events.length - 1]);
  }

  ourQuestions(): number {
    let i: number = 0;
    this.questions.forEach(question => question.eventCode === this.event.code ? i++ : i = i );
    this.counter = i;
    return i;
  }

  addNewQuestion(question: string, author: string) {
    author = author.trim();
    if(!author) { author = 'Anonimous'};
    let likes = 0;
    let replies = [];
    let date = Date.now();
    let eventCode = this.event.code;
    this.questionService.addQuestion({ question, author, likes, replies, date, eventCode } as Question).subscribe(
      question => this.questions.push(question));
    console.log(this.questions);
  }

  showReplies(q: Question): void {
    if (q.id !== this.id[q.id] || Object.keys(this.isReply).length === 0) { 
      this.isReply[q.id] = true;
      this.id[q.id] = q.id;
    } else { 
      this.isReply[q.id] = false;
      this.id[q.id] = -1;
    }
  }

  changeLike(q: Question): void {
    if (q.likes === 1) {
      q.likes = 0;
      this.questionService.updateQuestion(q).subscribe();
      console.log(q);
    } else {
      q.likes = 1;
      this.questionService.updateQuestion(q).subscribe();
      console.log(q);
    }
  }

  sortByLikes(): void {
    this.questions.sort((a: Question, b:Question) => b.likes - a.likes);
  }
}
