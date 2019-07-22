import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'sessions', loadChildren: './sessions/sessions.module#SessionsPageModule' },
  { path: 'speakers', loadChildren: './speakers/speakers.module#SpeakersPageModule' },
  { path: 'sponsors', loadChildren: './sponsors/sponsors.module#SponsorsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'session-detail', loadChildren: './session-detail/session-detail.module#SessionDetailPageModule' },
  { path: 'speaker-detail', loadChildren: './speaker-detail/speaker-detail.module#SpeakerDetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
