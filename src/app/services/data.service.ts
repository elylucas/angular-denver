import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { groupBy, map, mergeMap, reduce, filter, tap } from 'rxjs/operators';
import { SessionGroup, Speaker, DataObject, SessionViewModel, SpeakerGroup } from '../models/models';
import { FavoritesService } from './favorites.service';
import { addSeconds, isBefore, parse, format } from 'date-fns';
import { environment } from '../../environment';

@Injectable()
export class DataService {
  private lastFetch: Date;
  private dataCache: DataObject;

  constructor(private http: HttpClient, private favoritesService: FavoritesService) { }

  private async fetchData() {
    // Todo: Programmatically disable for PWAs
    // if (this.dataCache && !this.isCacheExpired()) {
    //   return await this.dataCache;
    // }
    this.dataCache = await this.http.get<DataObject>(environment.dataUrl).toPromise();
    this.lastFetch = new Date();
    return this.dataCache;
  }

  getData() {
    return from(this.fetchData()).pipe(
      map(data => {
        const sessions = data.sessions as SessionViewModel[];
        sessions.forEach(session => {
          session.speakers = [];
          session.speakerIds.forEach(id => {
            const speaker = data.speakers.find(x => x.id === id);
            session.speakers.push(speaker);
            session.isFavorite = this.favoritesService.isFavorite(session);
          });
          session.room = data.rooms.find(x => x.id === session.roomId);
          session.timeStart = parse(session.timeStart);
          session.timeEnd = parse(session.timeEnd);
        });
        return data;
      })
    );
  }

  getGroupedSessions(segment: string, day?: string): Observable<SessionGroup[]> {
    const date = day ? new Date(day) : undefined;
    return this.getSessions().pipe(
      mergeMap(x => from(x)),
      filter(session => {
        return segment === 'all' ? true : this.favoritesService.isFavorite(session);
      }),
      filter(session => {
        if (date) {
          return (
            session.timeStart.getDate() === date.getDate() &&
            session.timeStart.getMonth() === date.getMonth() &&
            session.timeEnd.getFullYear() === date.getFullYear()
          );
        } else {
          return true;
        }
      }),
      groupBy(p => p.timeStart.toISOString()),
      mergeMap(group =>
        group.pipe(reduce((acc: SessionViewModel[] | string[], cur) => [...acc, cur], [group.key]))
      ),
      reduce((acc, cur) => [...acc, { timeStart: cur[0], timeEnd: (cur.slice(1)[0] as any).timeEnd, sessions: cur.slice(1) }], [])
    );
  }

  getGroupedSpeakers(): Observable<SpeakerGroup[]> {
    return this.getSpeakers().pipe(
      mergeMap(x => from(x)),
      groupBy(p => p.lastName.substring(0, 1)),
      mergeMap(group => group.pipe(reduce((acc: Speaker[] | string[], cur) => [...acc, cur], [group.key]))),
      reduce((acc, cur) => [...acc, { letter: cur[0], speakers: cur.slice(1) }], []),
      map(groupedSpeakers =>
        groupedSpeakers.sort((x, y) => {
          if (x.letter < y.letter) {
            return -1;
          } else if (x.letter > y.letter) {
            return 1;
          }
          return 0;
        })
      )
    );
  }

  getSessions() {
    return this.getData().pipe(map(data => data.sessions as SessionViewModel[]));
  }

  getSessionsForSpeaker(speakerId: number): Observable<SessionViewModel[]> {
    return this.getSessions().pipe(map(s => s.filter(x => x.speakerIds.some(id => id === speakerId))));
  }

  getSpeakers(): Observable<Speaker[]> {
    return this.getData().pipe(
      map(data =>
        data.speakers.sort((x, y) => {
          if (x.lastName < y.firstName) {
            return -1;
          } else if (x.lastName > y.firstName) {
            return 1;
          }
          return 0;
        })
      )
    );
  }

  getSession(id: number): Observable<SessionViewModel> {
    return this.getSessions().pipe(map(sessions => sessions.find(s => s.id === id)));
  }

  getSpeaker(id: number): Observable<Speaker> {
    return this.getSpeakers().pipe(map(speaker => speaker.find(s => s.id === id)));
  }

  getEvent() {
    return this.getData().pipe(map(data => data.event));
  }

  getVenue() {
    return this.getData().pipe(map(data => data.venue));
  }

  getSponsors() {
    return this.getData().pipe(map(data => data.sponsors));
  }

  private isCacheExpired(): boolean {
    if (this.lastFetch) {
      const expDate = addSeconds(this.lastFetch, 300);
      if (isBefore(expDate, new Date())) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
