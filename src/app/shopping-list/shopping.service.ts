import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingService {
  ingredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  deleteItem = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }

  addIngredientFromRecipe(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChange.next(this.ingredients.slice());
  }

  getIngred(index: number) {
    return this.ingredients[index];
  }
  deleteIngredient(index: number) {
    console.log('index', index);
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.ingredients.slice());
  }
  updateIngridient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice());
  }
}
