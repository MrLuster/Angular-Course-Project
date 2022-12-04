import {Injectable, EventEmitter} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {shoppingListService} from "../Shoping List/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
//recipeSelectec = new EventEmitter<Recipe>();

  recipesChanged = new Subject<Recipe[]>();
/*
  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Italiano pizza',
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
      [
        new Ingredient('Meso',1),
        new Ingredient('Kruh', 2)
      ]),
    new Recipe(
      'Cevapi',
      'Masni',
      'https://pizzeriastross.com/wp-content/uploads/2020/04/IMG_4224-1-scaled.jpg',
      [
        new Ingredient('Meso',1),
        new Ingredient('Dead animal', 2),
        new Ingredient('Kruv', 2)
      ]),
    new Recipe(
      'Cufte',
      'Jebeno',
      'https://podravkaiovariations.azureedge.net/45ffe506-631f-11eb-846c-0242ac120065/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.jpeg',
      [
        new Ingredient('Cufte',3),
        new Ingredient('Otrov', 4)
      ]),
    new Recipe(
      'Kebab',
      'Balkan shit',
      'https://www.recipetineats.com/wp-content/uploads/2017/11/Chicken-Doner-Kebab-2.jpg?resize=650,975',
      [
        new Ingredient('Kebab',3),
        new Ingredient('Kruh', 2)
      ])
  ];

 */

  private recipes: Recipe[] = [];
  getRecipes(){
    return this.recipes.slice();
    //bez slice dobimo identican Array vani i moze se mijenjati znaci promjena koju napravis vani
    //djeluje i tu, Ako ima "slice" onda vani se dobi kopija i promjenom te kopije ne utjece se na
    //recipes ovdje
  }
  constructor(private shpService: shoppingListService) {
  }

  getRecipIndex(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingreduebts: Ingredient[]){
    this.shpService.addIngredients(ingreduebts);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(arrayRecipes: Recipe[]){
    this.recipes = arrayRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

}
