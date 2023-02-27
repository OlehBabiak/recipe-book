import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";
import {MapGeocoder} from "@angular/google-maps";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shopListService: ShoppingListService, private geocoder: MapGeocoder) {

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

   this.geocoder.geocode({
     location: new google.maps.LatLng(49.84628,  24.139488)
   })
     .subscribe(({results}) => {
       console.log(results)
     })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEditItem(index: number) {
    this.shopListService.startedEditing.next(index)
  }
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 49.884591,
    lng: 24.036611
  };
  city: any
  zoom = 8;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  markerPositions: google.maps.LatLngLiteral = {lat: 49.884591, lng: 24.036611};
}
