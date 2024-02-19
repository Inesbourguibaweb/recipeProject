import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // newIngredient : Ingredient;
  ingredients: Ingredient[] = [];
  private ingreSub: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.ingreSub = this.shoppingService.ingredientChange.subscribe(
      (ingredientChanged: Ingredient[]) =>
        (this.ingredients = ingredientChanged)
    );
  }
  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.ingreSub.unsubscribe();
  }
}
