import { Component, Input, OnInit } from '@angular/core';
import { CountryData } from 'src/app/model/country-data';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent implements OnInit {
  @Input() country: CountryData | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
