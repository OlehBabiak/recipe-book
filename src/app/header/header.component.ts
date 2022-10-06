import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  private userSub: Subscription;
  isUserAuth = false

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isUserAuth = !!user;
    })
  }

  onRecipesSave() {
    this.dataStorage.storeRecipes()
  }

  onRecipesFetch() {
    this.dataStorage.fetchRecipes().subscribe()
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
