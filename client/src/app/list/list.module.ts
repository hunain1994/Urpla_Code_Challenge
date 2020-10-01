import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { RouterModule } from "@angular/router";
import { ListResolver } from "../common/resolvers/list.resolver";

export const ROUTES = [
  { path: "", component: ListComponent, resolve: { heroes: ListResolver } },
];

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class ListModule {}
