import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../common/services/hero.service";
import Hero from "../models/hero";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.scss"],
})
export class FindComponent implements OnInit {
  character: any = {};
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  hero: Hero;
  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.hero = res["hero"];
    });
  }
}
