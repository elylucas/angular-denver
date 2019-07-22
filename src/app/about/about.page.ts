import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Event, Venue } from '../models/models';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  event$: Observable<Event>;
  venue$: Observable<Venue>;

  constructor(private dataService: DataService, private platform: Platform) {}

  ngOnInit() {
    this.event$ = this.dataService.getEvent();
    this.venue$ = this.dataService.getVenue();
  }

  openMap(venue: Venue) {
    const lat = venue.lon;
    const long = venue.lat;
    const text = venue.name;
    if (this.platform.is('ios')) {
      window.open(
        `http://maps.apple.com/?q=${text}&ll=${lat},${long}&near=${lat},${long}`,
        '_system',
        'location=yes'
      );
    } else {
      window.open(
        `http://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`,
        '_system',
        'location=yes');
    }
  }

  openLink(link: string) {
    window.open(
      link,
      '_system',
      'location=yes');
  }
}
