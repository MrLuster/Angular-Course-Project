import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './Shoping List/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './Shoping List/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './Recipe Book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './Recipe Book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './Recipe Book/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './Recipe Book/recipes/recipes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/dropdown.directive";
import {shoppingListService} from "./Shoping List/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './Recipe Book/Recipe Start/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './Recipe Book/recipe-edit/recipe-edit.component';
import {RecipeService} from "./Recipe Book/recipe.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { AlertComponent } from './shared/alert/alert.component';
import {PlaceholderDirective} from "./shared/placeholder/placeholder.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    shoppingListService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ //na Angular verziji 9 ili više nije potrebno radi i bez toga
    AlertComponent
  ]
})
export class AppModule { }
