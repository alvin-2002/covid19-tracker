import { Component, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  hamburger = faBars;
  cross = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  

}
