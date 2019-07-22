import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../models/models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
})
export class SponsorsPage implements OnInit {

  sponsors: Observable<Sponsor[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sponsors = this.dataService.getSponsors();
  }

}
