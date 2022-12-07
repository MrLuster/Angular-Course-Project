import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./Shoping List/shopping-list/shopping-list.component";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: '', redirectTo: '/recipes',pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
