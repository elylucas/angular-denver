import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Speaker, SessionViewModel } from '../models/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.page.html',
  styleUrls: ['./speaker-detail.page.scss'],
})
export class SpeakerDetailPage implements OnInit {
  speaker$: Observable<Speaker>;
  sessions$: Observable<SessionViewModel[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params.id, 10);
    this.speaker$ = this.dataService.getSpeaker(id);
    this.sessions$ = this.dataService.getSessionsForSpeaker(id);
  }

}
