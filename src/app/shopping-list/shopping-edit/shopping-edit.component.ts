import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('nameInput', {static: true}) newIngredientName: ElementRef;
 @ViewChild('amountInput', {static: true}) newIngredientAmount: ElementRef;

  @Output() creatIngredient = new EventEmitter<Ingredient>()

  constructor(private shopListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onClearItem() {

  }

  onDeleteItem() {

  }

  onAddItem(newIngredientName: HTMLInputElement, newIngredientAmount: HTMLInputElement) {
    const ingredient = new Ingredient(newIngredientName.value, +newIngredientAmount.value)
    this.shopListService.addIngredients(ingredient)
  }
}
