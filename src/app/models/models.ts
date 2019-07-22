import { Observable } from 'rxjs';

export interface Session {
  id: number;
  title: string;
  speakerIds: number[];
  abstract: string;
  timeStartString: string;
  timeEndString: string;
  roomId: number;
}

export interface SessionViewModel extends Session {
  timeStart: Date;
  timeEnd: Date;
  isFavorite: boolean;
  speakers: Speaker[];
  room: Room;
}

export interface SessionGroup {
  timeStart: string;
  sessions: SessionViewModel[];
}

export interface SpeakerGroup {
  letter: string;
  speakers: Speaker[];
}

export interface Speaker {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  blog: string;
  github: string;
  twitter: string;
  bio: string;
  imgUrl: string;
}

export interface Sponsor {
  id: number;
  name: string;
  description?: string;
  order: number;
  url?: string;
  imageUrl?: string;
}

export interface Room {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  dateStrings: string[];
  published: boolean;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  lat: string;
  lon: string;
  description: string;
}

export interface DataObject {
  speakers: Speaker[];
  sessions: Session[];
  rooms: Room[];
  event: Event;
  venue: Venue;
  sponsors: Sponsor[];
}
