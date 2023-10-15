import { Component, OnDestroy, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { Cocktail } from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"
import { Meta } from "@angular/platform-browser"

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
    cocktails$: Observable<Cocktail[]>

    constructor(private barRamonService: BarRamonService, private meta: Meta) {
        this.cocktails$ = this.barRamonService.getCocktails()
    }

    ngOnInit(): void {
        this.meta.addTag({
            name: "description",
            content: "A collection of The Ramons favorite cocktails",
        })
    }

    ngOnDestroy(): void {
        this.meta.removeTag("name=description")
    }
}
