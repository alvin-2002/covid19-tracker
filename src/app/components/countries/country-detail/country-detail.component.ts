import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CountryDetail } from 'src/app/model/country-details';
import { DataService } from 'src/app/services/data.service';
import { faArrowUp, faArrowDown, faSortAmountDown, faSortAmountDownAlt, faExchangeAlt} from '@fortawesome/free-solid-svg-icons';
import { SortingPipe } from 'src/app/sorting.pipe';
import { RotateProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  faArrowUp = faExchangeAlt;
  column: string = 'TotalDeaths'
  order: string = 'Ascending';
  lastUpdate: string = '';
  

  tableName: any[] = [
    { name: 'Province', label: 'Province', order: 'Descending', icon: faExchangeAlt},
    { name: 'New Cases', label: 'Confirmed', order: 'Ascending', icon: faExchangeAlt},
    { name: 'Total Cases', label: 'Confirmed', order: 'Ascending', icon: faExchangeAlt},
    { name: 'New Deaths', label: 'Deaths', order: 'Ascending', icon: faExchangeAlt},
    { name: 'Total Deaths', label: 'TotalDeaths', order: 'Ascending', icon: faExchangeAlt}
  ]

  finalData: CountryDetail[] = [];
  newCase = new Subject<string>();

  constructor(private dataService: DataService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(faExchangeAlt)
    this.loadCountryDetail();
    this.filter(0);

  }
  // getColor(): RotateProp {
  //   return '90';
  // }

  filter(index: number) {
    this.column = this.tableName[index].label;
    if (this.tableName[index].order === 'Ascending') {
      this.tableName[index].order = 'Descending';
      this.tableName[index].icon = faSortAmountDown;
    } else {
      this.tableName[index].order = 'Ascending';
      this.tableName[index].icon = faSortAmountDownAlt;
    }
    this.order = this.tableName[index].order;

    for (let item of this.tableName) {
      if (item !== this.tableName[index]) {
        if (item.label == 'Province') {
          item.order = 'Descending';
        }
        else {
          item.order = 'Ascending';
        }
        item.icon = faExchangeAlt;
      }
    }
  }

  loadCountryDetail() {
    let counDetail: CountryDetail[];
    let latest: CountryDetail[] = [];
    let oneDayBefore: CountryDetail[] = [];
   
    this.dataService.getCountryDetail(this.route.snapshot.params['country-code']).subscribe(detail => {
      counDetail = detail;

      // console.log(counDetail)
      if (counDetail.length == 0) return;
      let tdy = new Date(counDetail[counDetail.length-1].Date);

      for (let i = detail.length-1; i >= 0; i--) {
        let countryDate: string = counDetail[i].Date;
        let comp = new Date(countryDate);
        if (comp.getDate() === tdy.getDate() && comp.getMonth() == tdy.getMonth()){
          latest.push(counDetail[i]);
        } else if (comp.getDate() === tdy.getDate() - 1 && comp.getMonth() == tdy.getMonth()) {
          oneDayBefore.push(counDetail[i])
        }
        else break;
      } 
      latest.sort((a,b) => a.Province.localeCompare(b.Province))
      oneDayBefore.sort((a,b) => a.Province.localeCompare(b.Province))
      // console.log('latest', latest)
      // console.log('one', oneDayBefore)
      // console.log(latest.length)
      // console.log(oneDayBefore.length)
      if (latest.length === oneDayBefore.length) {
        for (let i = 0; i < latest.length; i++) {
          let val: CountryDetail = {} as CountryDetail; 
          
          val.Province = (latest[i].Province === '') ? latest[i].Country : latest[i].Province;
          val.Date = latest[i].Date;
          val.Deaths = (+latest[i].Deaths) - (+oneDayBefore[i].Deaths);
          val.Confirmed = (+latest[i].Confirmed) - (+oneDayBefore[i].Confirmed);
          val.TotalDeaths = +latest[i].Deaths;
          val.TotalCases = +latest[i].Confirmed;
          this.finalData.push(val);
          this.lastUpdate = latest[i].Date;
        }
      }

      // console.log('fina', this.finalData);
    })
   
  }

}
