import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountryListComponent } from './components/countries/country-list/country-list.component';
import { CountryCardComponent } from './components/countries/country-card/country-card.component';
import { CountryDetailComponent } from './components/countries/country-detail/country-detail.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortingPipe } from './sorting.pipe';
import { DropdownDirective } from './shared/dropdown.directive';
import { GraphComponent } from './components/home/graph/graph.component';


@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent,
    CountryListComponent,
    CountryCardComponent,
    CountryDetailComponent,
    HomeComponent,
    GraphComponent,
    DropdownDirective,
    SortingPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
