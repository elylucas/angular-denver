import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Session } from '../models/models';

const FAVORITES_KEY = 'favorites';

@Injectable()
export class FavoritesService {
  private favorites: number[] = [];

  constructor(private toastCtrl: ToastController) {
    let favorites: number[] = JSON.parse(window.localStorage.getItem(FAVORITES_KEY));
    if (!favorites) {
      favorites = [];
      this.saveToLocalStorage(favorites);
    }
    this.favorites = favorites;
  }

  private saveToLocalStorage(favorites) {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  isFavorite(session: Session) {
    return this.favorites.indexOf(session.id) > -1;
  }

  async toggleFavorite(session: Session) {
    const index = this.favorites.indexOf(session.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      const toast = await this.toastCtrl.create({
        message: 'Removed from favorites',
        position: 'bottom',
        duration: 1500,
        color: 'success'
      });
      toast.present();
      this.saveToLocalStorage(this.favorites);
      return false;
    } else {
      this.favorites.push(session.id);
      const toast = await this.toastCtrl.create({
        message: 'Added to favorites',
        position: 'bottom',
        duration: 1500,
        color: 'success'
      });
      toast.present();
      this.saveToLocalStorage(this.favorites);
      return true;
    }
  }
}
