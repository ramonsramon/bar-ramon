import { Component, Input } from "@angular/core"
import { Cocktail } from "../models/cocktail"

@Component({
    selector: "cocktail-list",
    templateUrl: "./cocktail-list.component.html",
    styleUrls: ["./cocktail-list.component.css"],
})
export class CocktailListComponent {
    @Input({ required: true }) cocktails: Cocktail[] | null = []
}
