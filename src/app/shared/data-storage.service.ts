import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log({"recipes": recipes})
    this.http.put('http://localhost:8090/api/recipes', {"recipes": recipes})
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchRecipes() {
    this.http.get<{'recipes': Recipe[]}>('http://localhost:8090/api/recipes')
      .subscribe(({"recipes": recipes}) => {
        this.recipeService.setRecipes(recipes)
        console.log(recipes)
      })
  }
}
