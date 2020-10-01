import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../common/services/hero.service";
import Hero from "../models/hero";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  heroes: Hero[];

  ngOnInit(): void {
    this.route.data.subscribe(
      (res) => {
        this.heroes = res["heroes"];
        console.log(this.heroes);
      },
      (err) => {
        console.log(err);
        this.heroes = [];
      }
    );
  }
}
