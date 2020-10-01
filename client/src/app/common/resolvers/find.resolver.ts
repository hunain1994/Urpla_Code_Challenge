import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import Hero from "../../models/hero";
import { HeroService } from "../services/hero.service";

@Injectable()
export class FindResolver implements Resolve<Hero[]> {
  constructor(private heroService: HeroService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Hero[]> {
    return this.heroService.getHero(route.params["id"]).pipe(
      catchError((error) => {
        this.router.navigate(["/"]);
        return of(null);
      })
    );
  }
}
