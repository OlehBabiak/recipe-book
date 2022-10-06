import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../services/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('http://localhost:8090/api/recipes', {"recipes": recipes})
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchRecipes() {
    //take(1) означає що мені треба взяти одне значення з observable і потім відразу відписатись
    // другий параметр exhaustMap чекає коли перший observable завершиться, після цьго отримує цого user
    // в exhaustMap ми повертаємо новий observable який замінює наш попередній observable
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        console.log('user.in: ', user)
        return this.http.get<{ 'recipes': Recipe[] }>('http://localhost:8090/api/recipes', {
          headers: new HttpHeaders({'Authorization': user.token})
        })
      }),
      map(recipes => {
        return recipes['recipes']
      }),
      tap(recipes => {//tap для того щоб виконати певний код без змін даних які проходять через observable
        this.recipeService.setRecipes(recipes)
        console.log(recipes)
      })
    )
  }
}
