import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Data, Params} from "@angular/router";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: Data) => {
        this.recipeDetail = data['recipe'];
      });
  }

  onAddIngredToShoppList() {
    this.recipeService.addIngredients(this.recipeDetail.ingredients);

  }
}
