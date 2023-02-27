import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from './shared/dropdown.directive';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {GoogleMapsModule} from '@angular/google-maps'
import {RecipeModule} from "./recipes/recipe/recipe.module";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    AppRoutingModule,
    RecipeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkWithHref,
    GoogleMapsModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
