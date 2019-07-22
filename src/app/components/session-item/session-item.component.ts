import { Component, OnInit, Input } from '@angular/core';
import { SessionViewModel } from '../../models/models';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit {
  @Input()
  session: SessionViewModel;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {}

  toggleFavorite(event: Event, session: SessionViewModel) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(session).then(isFavorite => (session.isFavorite = isFavorite));
  }
}
