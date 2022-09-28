import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: true}) newIngredientName: ElementRef;
  // @ViewChild('amountInput', {static: true}) newIngredientAmount: ElementRef;
  // @Output() creatIngredient = new EventEmitter<Ingredient>()
  @ViewChild('form', {static: false}) form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient

  constructor(private shopListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shopListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shopListService.getIngredient(index);
          this.form.setValue(this.editedItem)
        }
      )
  }

  onClearItem() {
    this.form.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.shopListService.deleteIngredient(this.editedItemIndex)
    this.onClearItem()
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shopListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shopListService.addIngredients(newIngredient)
    }
    this.editMode = false;
    this.form.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
