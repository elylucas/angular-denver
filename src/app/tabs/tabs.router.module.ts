import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sessions',
        children: [
          {
            path: '',
            loadChildren: '../sessions/sessions.module#SessionsPageModule'
          },
          {
            path: ':id',
            loadChildren: '../session-detail/session-detail.module#SessionDetailPageModule'
          },
          {
            path: ':id/speakers/:id',
            loadChildren: '../speaker-detail/speaker-detail.module#SpeakerDetailPageModule'
          }
        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: '',
            loadChildren: '../speakers/speakers.module#SpeakersPageModule'
          },
          {
            path: ':id',
            loadChildren: '../speaker-detail/speaker-detail.module#SpeakerDetailPageModule'
          },
          {
            path: ':id/sessions/:id',
            loadChildren: '../session-detail/session-detail.module#SessionDetailPageModule'
          }
        ]
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: '../favorites/favorites.module#FavoritesPageModule'
          },
          {
            path: ':id',
            loadChildren: '../session-detail/session-detail.module#SessionDetailPageModule',
          },
          {
            path: ':id/speakers/:id',
            loadChildren: '../speaker-detail/speaker-detail.module#SpeakerDetailPageModule'
          }
        ]
      },
      {
        path: 'sponsors',
        children: [
          {
            path: '',
            loadChildren: '../sponsors/sponsors.module#SponsorsPageModule'
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: '../about/about.module#AboutPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/sessions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sessions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
