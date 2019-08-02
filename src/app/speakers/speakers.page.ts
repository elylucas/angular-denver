import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Speaker, SpeakerGroup } from '../models/models';
import { DataService } from '../services/data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit {
  speakerGroups: Observable<SpeakerGroup[]>;

  constructor(private dataService: DataService,  private platform: Platform) { }

  ngOnInit() {
    this.speakerGroups = this.dataService.getGroupedSpeakers();
  }

  useStickyDividers() {
    return !(this.platform.is('ios') && !this.platform.is('cordova'));
  }

}
