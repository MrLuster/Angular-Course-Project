import {NgModule} from "@angular/core";
import {shoppingListService} from "./Shoping List/shopping-list.service";
import {RecipeService} from "./Recipe Book/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  providers:[
    shoppingListService,
    RecipeService,
    {
      provide:
      HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule{

}
