import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

//  @Output() prenosIzRecipeLista = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService,private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recip: Recipe[]) => {
        this.recipes = recip;
      });
    this.recipes = this.recipeService.getRecipes();

  }

  prenesiRecept(recept: Recipe) {
   // this.prenosIzRecipeLista.emit(recept);
    //this.recipeService.recipeSelectec.emit(recept);
  }

  napraviNoviRecept() {
    this.route.navigate(['new'], {relativeTo: this.activeRoute});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
