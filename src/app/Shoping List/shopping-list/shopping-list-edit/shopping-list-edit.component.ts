import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {shoppingListService} from "../../shopping-list.service";
import {Form, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
 // @ViewChild('nameInput', {static: false}) nameInputReference: ElementRef;
  //@ViewChild('amountInput', {static: false}) amountInputReference: ElementRef;
  @ViewChild('f', {static: false}) slForm: NgForm;
  subsscription: Subscription;
  editMode = false;
  editIdemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingServis: shoppingListService) { }

  ngOnInit(): void {

    this.subsscription = this.shoppingServis.startedEditing.subscribe(
      (index: number) => {
        this.editIdemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingServis.getIngredientForEdit(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });


      }
    );
  }
  ngOnDestroy() {
    this.subsscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
   // const newIngredient = new Ingredient(this.nameInputReference.nativeElement.value, this.amountInputReference.nativeElement.value);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingServis.updateIngredient(this.editIdemIndex, newIngredient)
    } else {
      this.shoppingServis.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingServis.deleteIngredient(this.editIdemIndex);
    this.slForm.reset();
    this.editMode = false;
  }
}
