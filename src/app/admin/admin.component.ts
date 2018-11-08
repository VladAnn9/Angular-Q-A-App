import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'; 

import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faChevronLeft = faChevronLeft;
  faHome = faHome;
  faMobileAlt = faMobileAlt;

  
  event: Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    this.eventService.getEvents().subscribe(events => this.event = events[events.length - 1]);
  } 

  
  
}
