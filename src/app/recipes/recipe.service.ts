import { ShoppingService } from './../shopping-list/shopping.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable() /** to inject a service inside a service e.g shopping sevice here */
export class RecipeService {
  /**Observables are a technique for event handling, 
    asynchronous programming, and handling multiple values emitted over time. */
  recipeSelected = new Subject<Recipe>();
  recipeChange = new Subject<Recipe[]>();
  constructor(private shoppingService: ShoppingService) {}

  private recipes: Recipe[] = [];
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  onAddingToSlComponen(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientFromRecipe(ingredients);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChange.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.recipes.slice());
  }
}
