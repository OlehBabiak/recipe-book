import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipes.component";
import {RecipeDetailComponent} from "../recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "../recipe-start/recipe-start.component";
import {RecipeResolver} from "../../services/recipe.resolver";

const recipeRoutes: Routes = [
  {path: '', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
    ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
