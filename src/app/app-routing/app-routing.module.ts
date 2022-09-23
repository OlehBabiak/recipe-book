import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'recipes', loadChildren: () => import('../recipes/recipe-routing/recipe-routing.module').then(module => module.RecipeRoutingModule)},
  {path: 'shopping-list', loadChildren: () => import('../shopping-list/shoping-list-routing/shopping-list-routing.module').then(module => module.ShoppingListRoutingModule)},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
