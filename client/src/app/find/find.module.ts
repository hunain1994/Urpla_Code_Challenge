import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FindComponent } from "./find.component";
import { RouterModule } from "@angular/router";
import { FindResolver } from "../common/resolvers/find.resolver";

export const ROUTES = [
  { path: "", component: FindComponent, resolve: { hero: FindResolver } },
];

@NgModule({
  declarations: [FindComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class FindModule {}
