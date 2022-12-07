import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', redirectTo: '/recipes',pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('src/app/Recipe Book/recipes.module').then(m => m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('src/app/Shoping List/shoping-list.module').then(m => m.ShopingListModule)},
  {path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
