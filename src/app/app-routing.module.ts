import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailComponent } from './components/countries/country-detail/country-detail.component';
import { CountryListComponent } from './components/countries/country-list/country-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'countries', component: CountryListComponent},
  {path: 'countries/:country-code', component: CountryDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
