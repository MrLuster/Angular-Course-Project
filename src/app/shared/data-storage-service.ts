import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../Recipe Book/recipe.service";
import {Recipe} from "../Recipe Book/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Apikejovi} from "../auth/apikejovi";

@Injectable({
  providedIn: "root"
})
export class DataStorageService{
  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService, private apiKeyovi: Apikejovi) {

  }

  storeRecipe(){
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.apiKeyovi.storeFetchData,recipes).subscribe(
      response =>{
        console.log(response);
      }
    );
  }

  fetchRecipe(){
      return this.http.get<Recipe[]>(this.apiKeyovi.storeFetchData)
        .pipe(map(recipee =>{
        return recipee.map(recept =>{
          return {...recept, ingrediants: recept.ingrediants ? recept.ingrediants: []
          };
        });
      }),tap(recipes =>{
        this.recipesService.setRecipes(recipes);
    }));
    }



  fetchRecipe1() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          this.apiKeyovi.storeFetchData,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingrediants ? recipe.ingrediants : []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
