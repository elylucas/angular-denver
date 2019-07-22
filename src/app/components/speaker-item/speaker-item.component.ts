import { Component, OnInit, Input } from '@angular/core';
import { Speaker } from 'src/app/models/models';

@Component({
  selector: 'speaker-item',
  templateUrl: './speaker-item.component.html',
  styleUrls: ['./speaker-item.component.scss'],
})
export class SpeakerItemComponent implements OnInit {

  @Input()
  speaker: Speaker;

  constructor() { }

  ngOnInit() {}

}
