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

  onAddItem() {
    const ingName = this.newIngredientName.nativeElement.value;
    const ingAmount = this.newIngredientAmount.nativeElement.value;
    const ingredient = new Ingredient(ingName, ingAmount)
    this.shopListService.addIngredients(ingredient)
  }
}
