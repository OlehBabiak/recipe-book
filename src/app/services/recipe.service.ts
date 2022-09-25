import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Testy Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://e7.pngegg.com/pngimages/340/1021/png-clipart-schnitzel-schnitzel-thumbnail.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big fat Burger',
      'What else you need to say?',
      'https://cdn-cmjom.nitrocdn.com/FpMsHpAgoVrRMnuAdmBhGkyiizdsWlSU/assets/static/optimized/rev-a59bba9/wp-content/uploads/2015/07/king-burger-541x633.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
  ];

  // recipeSelectEmitter = new EventEmitter<Recipe>()
  recipeSelectEmitter = new Subject<Recipe>()

  constructor(private shopServ: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredients(arr: Ingredient[]) {
    this.shopServ.addIngredientsFromRecipe(arr)
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

}
