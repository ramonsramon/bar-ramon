import { Component, Input, OnInit } from "@angular/core"
import { Cocktail, EMPTY_COCKTAIL } from "../models/cocktail"
import { BubbleComponent } from "../bubble/bubble.component"
import { RouterLink } from "@angular/router"
import { NgOptimizedImage } from "@angular/common"

@Component({
    selector: "cocktail-card",
    standalone: true,
    imports: [BubbleComponent, RouterLink, NgOptimizedImage],
    templateUrl: "./cocktail-card.component.html",
    styleUrls: ["./cocktail-card.component.css"],
})
export class CocktailCardComponent implements OnInit {
    @Input({ required: true }) cocktail: Cocktail = EMPTY_COCKTAIL
    @Input({ required: true }) cocktailIndex: number = 0
    cocktailLink: string = ""
    cocktailImage: string = ""

    constructor() {}

    ngOnInit(): void {
        this.cocktailLink = `cocktails/${this.cocktail.RecipeName.replaceAll(
            " ",
            "-"
        ).toLowerCase()}`
        this.cocktailImage = `/assets/img/1x1/${this.cocktail.Image}`
    }
}
