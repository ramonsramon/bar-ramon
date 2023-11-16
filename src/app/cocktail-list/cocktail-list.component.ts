import { Component, Input } from "@angular/core"
import { Cocktail } from "../models/cocktail"
import { CocktailCardComponent } from "../cocktail-card/cocktail-card.component"

@Component({
    selector: "cocktail-list",
    standalone: true,
    imports: [CocktailCardComponent],
    templateUrl: "./cocktail-list.component.html",
    styleUrls: ["./cocktail-list.component.css"],
})
export class CocktailListComponent {
    @Input({ required: true }) cocktails: Cocktail[] | null = []
}
