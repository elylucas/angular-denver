import { Component, OnInit } from '@angular/core';
import { Session, SessionViewModel } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.page.html',
  styleUrls: ['./session-detail.page.scss'],
})
export class SessionDetailPage implements OnInit {
  session: SessionViewModel;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params.id, 10);
    this.dataService.getSession(id).subscribe(session => {
      this.session = session;
      this.isFavorite = this.favoritesService.isFavorite(session);
    });
  }

  toggleFavorite(session: Session) {
    this.favoritesService
      .toggleFavorite(session)
      .then(isFavorite => (this.isFavorite = isFavorite));
  }

}
