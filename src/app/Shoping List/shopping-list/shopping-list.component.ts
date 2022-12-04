import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {shoppingListService} from "../shopping-list.service";
import {Recipe} from "../../Recipe Book/recipe.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 /* ingredients1: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos',10),
    new Ingredient('Potato',2)
  ];
  */

  ingredients: Ingredient[];
  private igChange: Subscription //To je promjenio u "subscription" Lekcija 182



  constructor(private shoppingService: shoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.igChange = this.shoppingService.promjenaSastojka.subscribe(
      (ingr: Ingredient[]) =>{
        this.ingredients = ingr;
      }
    )
  }

  ngOnDestroy() {
    this.igChange.unsubscribe();
  }

  onClick(index: number) {
    this.shoppingService.startedEditing.next(index);

  }
}
