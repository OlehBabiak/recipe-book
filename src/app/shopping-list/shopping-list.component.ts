import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
ingredients: Ingredient[];

  constructor(private shopListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shopListService.getIngredients();
    this.shopListService.ingredientsChanged
      .subscribe((value: Ingredient[]) => {
      this.ingredients = value
    })
  }
}
