import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'course-project-app';
  recept: boolean= false;
  shopping: boolean = false;

  prenesiPodatke(vrijednsot: { bRecept: boolean; bShopping: boolean }) {
      this.recept = vrijednsot.bRecept;
      this.shopping = vrijednsot.bShopping;
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}