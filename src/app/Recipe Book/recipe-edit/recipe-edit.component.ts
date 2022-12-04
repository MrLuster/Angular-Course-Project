import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from "@angular/router";
import {FormGroup, FormControl, FormArray, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) =>{
        this.id = params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeUrl = '';
    let recipeDescription = '';
    let recipeIngrediants = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipIndex(this.id);
      recipeName = recipe.name;
      recipeUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingrediants']) {
        for(let ingredant of recipe.ingrediants){
           recipeIngrediants.push(
             new FormGroup({
             'name': new FormControl(ingredant.name, Validators.required),
             'amount': new FormControl(ingredant.amount, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
           })
           );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingrediants': recipeIngrediants

    });
  }

  onSubmit() {
    console.log(this.recipeForm);
    //const newRecipe = new Recipe(100, this.recipeForm.value['name'], this.recipeForm.value['description'], this.recipeForm.value['imagePath'], this.recipeForm.value['ingrediants']);

    if(this.editMode){
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo:this.activeRoute});


  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }

  onAddIngrediant() {
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancelClick() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  onRecipeDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }
}
