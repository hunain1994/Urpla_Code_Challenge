import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HeroService } from "./common/services/hero.service";
import { ListResolver } from "./common/resolvers/list.resolver";
import { FindResolver } from "./common/resolvers/find.resolver";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, HttpClientModule],
  providers: [HeroService, ListResolver, FindResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
