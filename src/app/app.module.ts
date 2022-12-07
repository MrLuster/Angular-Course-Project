import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RecipesModule} from "./Recipe Book/recipes.module";
import {ShopingListModule} from "./Shoping List/shoping-list.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShopingListModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],

  bootstrap: [AppComponent],


  /*entryComponents: [ //na Angular verziji 9 ili više nije potrebno radi i bez toga
    AlertComponent
  ]
   */
})
export class AppModule { }
