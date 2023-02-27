import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipes.component";
import {RecipeDetailComponent} from "../recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "../recipe-start/recipe-start.component";
import {RecipeResolver} from "../../services/recipe.resolver";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {AuthGuard} from "../../auth/auth.guard";

const recipeRoutes: Routes = [
  {path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]},
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
