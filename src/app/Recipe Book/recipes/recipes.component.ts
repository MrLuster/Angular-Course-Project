import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  receptZaPrienos: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  /*  this.recipeService.recipeSelectec.subscribe(
      (recipe: Recipe) => {
        this.receptZaPrienos = recipe;
      }
    )

   */
  }

  izabranRecept(dobiven: Recipe) {
    this.receptZaPrienos = dobiven;

  }
}
