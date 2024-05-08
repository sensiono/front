import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserService} from'src/app/services/user.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent!: ElementRef;
  calendar!: Calendar;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.calendar = new Calendar(this.calendarComponent.nativeElement, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
    });

    this.calendar.render();
  }
}
