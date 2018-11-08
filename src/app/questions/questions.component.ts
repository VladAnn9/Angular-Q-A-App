import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import { Question } from '../question';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: Question[];


  faThumbsUp = faThumbsUp;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faReply = faReply;


  isEdit: any = {};

  hideMe: any = {};
    
  id: number;
  
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void { 
    this.questionService.getQuestions().subscribe(q => this.questions = q);
  }

  showReply(q): void {
    if (q.id !== this.id || Object.keys(this.hideMe).length === 0) { 
      Object.keys(this.hideMe).forEach(h => {
        this.hideMe[h] = false;
      });
      this.hideMe[q.id] = true;
      this.id = q.id;
    } else { 
      this.hideMe[q.id] = false;
      this.id = -1;
    }
  }

  sendReply(reply: string, q: Question): void {
    event.preventDefault(); // without reloading the page
    if (reply === "" || reply.trim().length === 0) {
      alert("Write an answer!");
      return;
    }
    reply = reply.replace(/\n|\r/g, "");
    reply.trim();
    q.replies.push(reply);
    this.hideMe[q.id] = false;
    this.id = -1;

    this.questionService.updateQuestion(q).subscribe();
    console.log(q);
  }

  deleteReply(reply: string, q): void {
    q.replies = q.replies.filter((rep) => rep !== reply);
    this.questionService.updateQuestion(q).subscribe();
    console.log(q.replies);
  }

  showEdit(q): void {
    Object.keys(this.isEdit).forEach(e => {
      this.isEdit[e] = false;
    });
    this.isEdit[q.id] = true;
  }

  editSave(editedQuestion: string, q): void {
    q.question = editedQuestion;
    this.isEdit[q.id] = false;
    this.questionService.updateQuestion(q).subscribe();
  }

  deleteQuestion(question: Question): void {
    this.questions = this.questions.filter(q => q !== question)
    this.questionService.deleteQuestion(question).subscribe();
  }

}
