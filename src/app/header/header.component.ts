import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {DataStorageService} from "../shared/data-storage-service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  text = "Restart"
  boolRecept = false;
  boolShopping = false;

  private userSub: Subscription;
  isAuthenticated = false;

  @Output() otvoriComponent = new EventEmitter<{bRecept: boolean, bShopping: boolean}>();

  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user =>{
      //this.isAuthenticated = !user ? false : true; Dole je neka luda kraca verzija ako user postoji onda ne postoji pa je jos jednom negativno pa postoji
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  klinutoJeRecipe() {
    this.text = "Kliknuto je";
    this.boolRecept = true;
    this.boolShopping = false;
    this.otvoriComponent.emit({bRecept: this.boolRecept , bShopping: this.boolShopping});
  }

  kliknutoJeShopping() {
    this.text = "Kliknut je shopping";
    this.boolRecept = false;
    this.boolShopping = true;
    this.otvoriComponent.emit({bRecept: this.boolRecept , bShopping: this.boolShopping});
  }

  onSaveDataClick() {
    this.dataService.storeRecipe();
  }

  onFetchDataClick() {
    this.dataService.fetchRecipe().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
