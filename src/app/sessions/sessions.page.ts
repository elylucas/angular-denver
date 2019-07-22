import { Component, OnInit } from '@angular/core';
import { SessionGroup, Session, SessionViewModel } from '../models/models';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage {
  day = '08/01/2019';
  sessionGroups: SessionGroup[];

  constructor(private dataService: DataService, private favoritesService: FavoritesService) { }

  ionViewWillEnter() {
    this.updateSessions();
  }

  updateSessions() {
    this.dataService
      .getGroupedSessions('all', this.day)
      .subscribe(sessionGroups => (this.sessionGroups = sessionGroups));
  }

  segmentChanged() {
    this.updateSessions();
  }

  trackByFnSession(index, session: Session) {
    return session.id;
  }

  trackByFnSessionGroup(index, sessionGroup: SessionGroup) {
    return sessionGroup.timeStart;
  }

  doRefresh(event) {
    // console.log('Begin async operation');

    // setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    // }, 0);
  }

}
