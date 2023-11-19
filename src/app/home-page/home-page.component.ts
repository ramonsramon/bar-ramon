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
    cocktails: Signal<Cocktail[]> = this.barRamonService.getCocktails()
    searchValue: string = ""
    cursor: Cursor = { start: 0, end: 10 }

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
            const cursorStartValue = params.get("start")
            const cursorEndValue = params.get("end")
            if (searchParamValue) {
                this.searchValue = searchParamValue
            }
            if (cursorStartValue && cursorEndValue) {
                this.cursor = {
                    start: Number(cursorStartValue),
                    end: Number(cursorEndValue),
                }
            } else {
                this.cursor = { start: 0, end: 10 }
            }
            this.searchCocktails()
        })
    }

    ngOnDestroy(): void {
        this.meta.removeTag("name=description")
    }

    searchCocktails() {
        this.cursor = { start: 0, end: 10 }
        if (this.searchValue === "") {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    start: this.cursor.start,
                    end: this.cursor.end,
                },
            })
            this.barRamonService.updateFilter(() => true)
        } else {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    search: this.searchValue.toLocaleLowerCase(),
                    start: this.cursor.start,
                    end: this.cursor.end,
                },
            })
            this.barRamonService.updateFilter((value) => {
                return (
                    value.RecipeName.toLocaleLowerCase().includes(
                        this.searchValue.toLocaleLowerCase()
                    ) ||
                    value.PrimarySpirit.toLocaleLowerCase().includes(
                        this.searchValue.toLocaleLowerCase()
                    )
                )
            })
        }
    }

    updateCursor(e: Cursor) {
        this.cursor = e
        if (this.searchValue === "") {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    start: this.cursor.start,
                    end: this.cursor.end,
                },
            })
        } else {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    search: this.searchValue.toLocaleLowerCase(),
                    start: this.cursor.start,
                    end: this.cursor.end,
                },
            })
        }
    }

    clear() {
        this.searchValue = ""
        this.searchCocktails()
    }
}
