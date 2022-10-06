import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  private userSub: Subscription;
  isUserAuth = false

  constructor(private dataStorage: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      console.log(!user)
      console.log(!!user)
      this.isUserAuth = !!user;
    })
  }

  onRecipesSave() {
    this.dataStorage.storeRecipes()
  }

  onRecipesFetch() {
    this.dataStorage.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
