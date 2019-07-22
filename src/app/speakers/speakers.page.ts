import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Speaker, SpeakerGroup } from '../models/models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit {
  speakerGroups: Observable<SpeakerGroup[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.speakerGroups = this.dataService.getGroupedSpeakers();
  }

}
