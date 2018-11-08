import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { EventsListComponent } from './events-list/events-list.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: MainComponent},
  { path: 'questions', component: QuestionsComponent },
  { path: 'user', component: UserComponent },
  { path: 'events', component: EventsListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
