import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  odabraniRecept: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute, private route: Router, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) =>{
      this.id = +params['id'];
      this.odabraniRecept = this.recipeService.getRecipIndex(this.id);
    })
  }

  onAddToShoppingList() {
  this.recipeService.addIngredientsToShoppingList(this.odabraniRecept.ingrediants)
  }

  editRecept() {
    this.route.navigate(['edit'], {relativeTo: this.activeRoute});
    //this.route.navigate(['../',this.id, 'edit'], {relativeTo: this.activeRoute}); Kompliciraniji nacin, al se momze ovako izvesti ako trebas neki broj koji nije u adresi
  }

  onDeleteClick() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
