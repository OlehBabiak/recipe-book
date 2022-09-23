import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()
  private ingredients: Ingredient[] = []

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsFromRecipe(arr: Ingredient[]) {
    this.ingredients.push(...arr)
    this.ingredientsChanged.emit(this.ingredients.slice());
    console.log(this.ingredients)
  }
}
