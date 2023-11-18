import { Component, OnDestroy, OnInit, Signal } from "@angular/core"
import { Cocktail } from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"
import { Meta } from "@angular/platform-browser"
import { CocktailListComponent } from "../cocktail-list/cocktail-list.component"
import { PagerComponent } from "../pager/pager.component"
import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { Cursor } from "../models/cursor"

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

    constructor(private barRamonService: BarRamonService, private meta: Meta) {}

    ngOnInit(): void {
        this.meta.addTag({
            name: "description",
            content: "A collection of The Ramons favorite cocktails",
        })
        this.searchCocktails()
    }

    ngOnDestroy(): void {
        this.meta.removeTag("name=description")
    }

    searchCocktails() {
        if (this.searchValue === "") {
            this.barRamonService.updateFilter(() => true)
        } else {
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
        this.cursor = { start: 0, end: 10 }
    }

    updateCursor(e: Cursor) {
        this.cursor = e
    }
}
