import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage-service";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataService: DataStorageService, private receptiService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const recepeti = this.receptiService.getRecipes();
      if(recepeti.length === 0){
        return this.dataService.fetchRecipe();
      }
      else return recepeti;
  }
}
