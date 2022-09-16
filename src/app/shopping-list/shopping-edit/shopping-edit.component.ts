import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('nameInput', {static: true}) newIngredientName: ElementRef;
 @ViewChild('amountInput', {static: true}) newIngredientAmount: ElementRef;

  @Output() creatIngredient = new EventEmitter<Ingredient>()

  constructor() {
  }

  ngOnInit(): void {
  }

  onClearItem() {

  }

  onDeleteItem() {

  }

  onAddItem(newIngredientName: HTMLInputElement, newIngredientAmount: HTMLInputElement) {
    console.log(this.newIngredientName)
    this.creatIngredient.emit({
      name: newIngredientName.value,
      amount: +newIngredientAmount.value
    })
  }
}
