import { Component, OnDestroy, OnInit, Signal } from "@angular/core"
import { Cocktail } from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"
import { Meta } from "@angular/platform-browser"
import { CocktailListComponent } from "../cocktail-list/cocktail-list.component"
import { PagerComponent } from "../pager/pager.component"
import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { Cursor } from "../models/cursor"
import { ActivatedRoute, Router } from "@angular/router"
import { first } from "rxjs"

type BarRamonParams = {
    search?: string
    start: number
    end: number
}

@Component({
    selector: "home-page",
    standalone: true,
    imports: [
        CocktailListComponent,
        PagerComponent,
        FormsModule,
        MatIconModule,
    ],
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
    readonly baseCursor: Cursor = { start: 0, end: 10 }
    cocktails: Signal<Cocktail[]> = this.barRamonService.getCocktails()
    searchValue: string = ""
    cursor: Cursor = this.baseCursor

    constructor(
        private barRamonService: BarRamonService,
        private meta: Meta,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.meta.addTag({
            name: "description",
            content: "A collection of The Ramons favorite cocktails",
        })
        this.route.queryParamMap.pipe(first()).subscribe((params) => {
            const searchParamValue = params.get("search")
            if (searchParamValue) {
                this.searchValue = searchParamValue
            }
            this.searchCocktails(this.cursor)
        })
    }

    ngOnDestroy(): void {
        this.meta.removeTag("name=description")
    }

    searchCocktails(cursor: Cursor) {
        this.cursor = cursor
        let queryParams: BarRamonParams = {
            start: this.cursor.start,
            end: this.cursor.end,
        }
        let filterFunc = (value: Cocktail) => true
        if (this.searchValue.length > 0) {
            queryParams.search = this.searchValue.toLowerCase()
            filterFunc = (value: Cocktail) => {
                return (
                    value.RecipeName.toLowerCase().includes(
                        this.searchValue.toLowerCase()
                    ) ||
                    value.PrimarySpirit.toLowerCase().includes(
                        this.searchValue.toLowerCase()
                    )
                )
            }
        }
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: queryParams,
        })
        this.barRamonService.updateFilter(filterFunc)
    }

    clear() {
        this.searchValue = ""
        this.searchCocktails(this.baseCursor)
    }
}
