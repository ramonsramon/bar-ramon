import { Component, OnDestroy, OnInit, inject } from "@angular/core"
import { Observable } from "rxjs"
import { Cocktail } from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"
import { Meta } from "@angular/platform-browser"
import { Analytics } from "@angular/fire/analytics"

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
    cocktails$: Observable<Cocktail[]>
    private analytics: Analytics = inject(Analytics)

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
