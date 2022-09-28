import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shopListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shopListService.getIngredients();
    // this.shopListService.ingredientsChanged
    //   .subscribe((value: Ingredient[]) => {
    //     this.ingredients = value
    //   })

    this.subscription = this.shopListService.ingredientsChanged
      .subscribe((value: Ingredient[]) => {
        this.ingredients = value
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEditItem(index: number) {
    this.shopListService.startedEditing.next(index)
  }
}
