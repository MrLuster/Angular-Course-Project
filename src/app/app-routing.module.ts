import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./Recipe Book/recipes/recipes.component";
import {ShoppingListComponent} from "./Shoping List/shopping-list/shopping-list.component";
import {NgModule} from "@angular/core";
import {RecipeDetailComponent} from "./Recipe Book/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./Recipe Book/Recipe Start/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./Recipe Book/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./Recipe Book/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/recipes',pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent,  resolve: [RecipesResolverService]}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
