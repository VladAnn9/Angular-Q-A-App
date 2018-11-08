import { Component, OnInit } from '@angular/core';

import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  events: Event[];
  
  show: boolean = false;
  
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  } 

  createEvent(name: string, code: string): void {
    code = code.trim();
    if (!name) {return;}
    let date = Date.now();
    this.eventService.addEvent({ name, code, date } as Event).subscribe(event => this.events.push(event));
    console.log(this.events);
  }

  join(code: string) {
    code = code.trim();
    console.log(this.events);
    let event;
    this.events.forEach((value: Event) => {
      if(value.code === code) {
        event = value;
        console.log(event);
      }
    });
    this.events = this.events.filter(e => e.id !== event.id);
    this.eventService.deleteEvent(event).subscribe();
    this.eventService.addEvent( event as Event).subscribe(event => this.events.push(event));
    console.log(this.events);
  }
}
