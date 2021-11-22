import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = "https://disease.sh/v3/covid-19/";
  private countryDetailUrl = "https://api.covid19api.com/live/country/";

  constructor(private http: HttpClient) { }

  getGlobalData(): Observable<any> {
    return this.http.get(this.dataUrl + 'all');
  }

  getGlobalDataGraphing(): Observable<any> {
    return this.http.get(this.dataUrl + 'historical/all?lastdays=all');
  }

  getCountriesData(): Observable<any> {
    return this.http.get(this.dataUrl + 'countries');
  }

  getCountryDetail(countryCode: string): Observable<any> {
    return this.http.get(this.countryDetailUrl + countryCode);
  }
}
