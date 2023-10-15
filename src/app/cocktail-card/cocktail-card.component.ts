import { Component, Input, OnInit } from "@angular/core"
import { Cocktail, EMPTY_COCKTAIL } from "../models/cocktail"

@Component({
    selector: "cocktail-card",
    templateUrl: "./cocktail-card.component.html",
    styleUrls: ["./cocktail-card.component.css"],
})
export class CocktailCardComponent implements OnInit {
    @Input({ required: true }) cocktail: Cocktail = EMPTY_COCKTAIL
    cocktailLink: string = ""

    constructor() {}

    ngOnInit(): void {
        this.cocktailLink = `cocktails/${this.cocktail.RecipeName.replace(
            " ",
            "-"
        ).toLowerCase()}`
    }
}