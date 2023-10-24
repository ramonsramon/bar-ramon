import { Component, Inject, OnDestroy, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { Cocktail } from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"
import { Meta } from "@angular/platform-browser"
import { DOCUMENT } from "@angular/common"

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
    totalCocktails$: Observable<Cocktail[]>
    shownCocktails: Cocktail[] = []

    constructor(
        private barRamonService: BarRamonService,
        private meta: Meta,
        @Inject(DOCUMENT) private _document: Document
    ) {
        this.totalCocktails$ = this.barRamonService.getCocktails()
    }

    async ngOnInit(): Promise<void> {
        this.meta.addTag({
            name: "description",
            content: "A collection of The Ramons favorite cocktails",
        })
    }

    ngOnDestroy(): void {
        this.meta.removeTag("name=description")
    }

    updateShown(cocktails: Cocktail[]) {
        this.shownCocktails = cocktails
        this._document.defaultView?.scrollTo(0, 0)
    }
}
