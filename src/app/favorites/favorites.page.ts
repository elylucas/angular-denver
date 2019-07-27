import { Component, OnInit } from '@angular/core';
import { SessionGroup, SessionViewModel } from '../models/models';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  segment = 'favorites';
  sessionGroups: SessionGroup[];

  constructor(private dataService: DataService, private favoritesService: FavoritesService) { }

  ionViewWillEnter() {
    this.updateSessions();
  }

  updateSessions() {
    this.dataService
      .getGroupedSessions(this.segment)
      .subscribe(sessionGroups => (this.sessionGroups = sessionGroups));
  }

  segmentChanged() {
    this.updateSessions();
  }

  trackByFnSession(index, session: SessionViewModel) {
    return session.id;
  }

  trackByFnSessionGroup(index, sessionGroup: SessionGroup) {
    return sessionGroup.time;
  }

  toggleFavorite(event: Event, session: SessionViewModel) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService
      .toggleFavorite(session)
      .then(isFavorite => (session.isFavorite = isFavorite));
  }

}
