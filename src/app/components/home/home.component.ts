import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { GlobalData } from 'src/app/model/global-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  globalData: GlobalData = {
    cases: 0,
    deaths: 0,
    recovered: 0,
    todayCases: 0,
    todayDeaths: 0,
    todayRecovered: 0,
    updated: '',
  };

  constructor(private dataService: DataService) { 
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe((data) => {
      this.globalData = data;
      console.log(data);
    })
  }







}
