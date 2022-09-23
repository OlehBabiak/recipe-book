import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "../shopping-list.component";

const shoppingListRotes: Routes = [
  {path: '', component: ShoppingListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingListRotes)
  ],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
