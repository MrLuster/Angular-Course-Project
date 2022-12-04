import {Injectable, EventEmitter} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable()

export class shoppingListService{
  promjenaSastojka = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos',10),
    new Ingredient('Potato',2)
  ];

  getIngredient(){
    return this.ingredients.slice();
  }

  addIngredient(sastojak: Ingredient){
    this.ingredients.push(sastojak);
    this.promjenaSastojka.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.promjenaSastojka.next(this.ingredients.slice())
    //"..."- spread operator u pushu mozes poslati array tako da ga razdeli npr array brojevi[] na [1,2,3,4,5] npr
  }

  updateIngredient(index: number, updejtSastojak: Ingredient){
    this.ingredients[index] = updejtSastojak;
    this.promjenaSastojka.next(this.ingredients.slice());
  }

  getIngredientForEdit(index: number){
    return this.ingredients[index];
  }

  deleteIngredient(idex:  number){
    //delete this.ingredients[idex];
    this.ingredients.splice(idex,1);
    console.log(this.ingredients);
    this.promjenaSastojka.next(this.ingredients.slice())

  }


}
