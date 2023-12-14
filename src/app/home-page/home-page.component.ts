import { Component, OnDestroy, OnInit, Signal } from "@angular/core"
import { Cocktail } from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"
import { Meta } from "@angular/platform-browser"
import { CocktailListComponent } from "../cocktail-list/cocktail-list.component"
import { PagerComponent } from "../pager/pager.component"
import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { ActivatedRoute, Router } from "@angular/router"
import { first } from "rxjs"

type BarRamonParams = {
    search?: string
    page: number
    pageSize: number
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
    readonly basePage: number = 1
    cocktails: Signal<Cocktail[]> = this.barRamonService.getCocktails()
    searchValue: string = ""
    currentPage: number = this.basePage
    pageSize: number = 10

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
            this.searchCocktails(this.currentPage)
        })
    }

    ngOnDestroy(): void {
        this.meta.removeTag("name=description")
    }

    searchCocktails(page: number) {
        this.currentPage = page
        let queryParams: BarRamonParams = {
            page: this.currentPage,
            pageSize: this.pageSize,
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
        this.searchCocktails(this.basePage)
    }
}
