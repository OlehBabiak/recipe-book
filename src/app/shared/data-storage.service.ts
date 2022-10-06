import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../services/recipe.service";
import {map, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('http://localhost:8090/api/recipes', {"recipes": recipes})
      .subscribe(response => {
        console.log('storeRecipes: ', response)
      })
  }

  fetchRecipes() {
    return this.http.get<{ 'recipes': Recipe[] }>('http://localhost:8090/api/recipes')
      .pipe(
        map(recipes => {
          return recipes['recipes']
        }),
        tap(recipes => {//tap для того щоб виконати певний код без змін даних які проходять через observable
          this.recipeService.setRecipes(recipes)
        })
      )
  }
}
