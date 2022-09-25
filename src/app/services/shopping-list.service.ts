import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>()
  ingredientsChanged = new Subject<Ingredient[]>()
  private ingredients: Ingredient[] = []

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient) {
    this.ingredients.push(ingredient)
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsFromRecipe(arr: Ingredient[]) {
    this.ingredients.push(...arr)
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log(this.ingredients)
  }
}
