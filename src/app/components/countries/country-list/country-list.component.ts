import { Component, OnInit } from '@angular/core';
import { CountryData } from 'src/app/model/country-data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  filterCountry: string = '';

  countriesData: CountryData[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.dataService.getCountriesData().subscribe(data => {
      this.countriesData = data;
    });
  }

}
