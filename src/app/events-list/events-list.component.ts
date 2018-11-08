import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faArrowRight = faArrowRight;

  events: Event[];
  
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  } 

  createEvent(name: string, code: string): void {
    code = code.trim();
    let date = Date.now();
    this.eventService.addEvent({ name, code, date } as Event).subscribe(event => this.events.push(event));
  }

  deleteEvent(event: Event): void {
    this.events = this.events.filter(e => e.id !== event.id);
    this.eventService.deleteEvent(event).subscribe();
  }

  goToEvent(event: Event) {
    console.log(this.events);
    this.events = this.events.filter(e => e.id !== event.id);
    this.eventService.deleteEvent(event).subscribe();
    this.eventService.addEvent( event as Event).subscribe(event => this.events.push(event));
    console.log(this.events);
  }

}
