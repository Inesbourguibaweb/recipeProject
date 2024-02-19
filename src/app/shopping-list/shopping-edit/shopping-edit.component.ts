import { FormGroup, NgForm } from '@angular/forms';
import { ShoppingService } from './../shopping.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  subToDelete: Subscription;
  editMode = false;
  submited = false;
  editItemIndex: number;
  deletedItem: number;
  editedItem: Ingredient;
  // ingredient = {
  //   name: '',
  //   amount: null,
  // };

  constructor(private shoppingService: ShoppingService) {}

  onSubmit() {
    console.log('ngForm', this.ingredientForm);
    this.submited = true;
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngridient(this.editItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }
  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.deletedItem);
    this.ingredientForm.reset();
    this.editMode = false;
  }
  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingService.getIngred(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
    this.subToDelete = this.shoppingService.deleteItem.subscribe(
      (index: number) => {
        this.deletedItem = index;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subToDelete.unsubscribe();
  }
}
