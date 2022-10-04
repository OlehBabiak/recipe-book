import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RecipeService} from "./recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private dataStorage: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorage.fetchRecipes();
    }else {
      return recipes
    }
  }
}
