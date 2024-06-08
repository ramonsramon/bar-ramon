import { Component, Inject, OnDestroy, OnInit } from "@angular/core"
import {
    DomSanitizer,
    Meta,
    SafeResourceUrl,
    Title,
} from "@angular/platform-browser"
import { BarRamonService } from "../bar-ramon.service"
import { ActivatedRoute, Router } from "@angular/router"
import { switchMap } from "rxjs/operators"
import { Subscription, of } from "rxjs"
import { Cocktail, EMPTY_COCKTAIL } from "../models/cocktail"
import { Recipe } from "../models/recipe"
import { DOCUMENT } from "@angular/common"
import { BubbleComponent } from "../bubble/bubble.component"
import { MoreInfoComponent } from "../more-info/more-info.component"
import { environment } from "src/environments/environment"

@Component({
    selector: "cocktail-page",
    standalone: true,
    imports: [BubbleComponent, MoreInfoComponent],
    templateUrl: "./cocktail-page.component.html",
    styleUrls: ["./cocktail-page.component.css"],
})
export class CocktailPageComponent implements OnInit, OnDestroy {
    private script: HTMLScriptElement
    private subscriptions: Subscription = new Subscription()
    cocktail: Cocktail = EMPTY_COCKTAIL
    trustedVideoSrc: SafeResourceUrl
    cocktailImage: string = ""

    constructor(
        private barRamonService: BarRamonService,
        private meta: Meta,
        private title: Title,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer,
        @Inject(DOCUMENT) private _document: Document
    ) {
        this.trustedVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl("")
        this.script = this._document.createElement("script")
    }

    ngOnInit(): void {
        // Do look up of cocktail to display on page
        const routeSub = this.activatedRoute.paramMap
            .pipe(
                switchMap((paramMap) => {
                    const id = paramMap.get("id")
                    if (id) {
                        return this.barRamonService.getCocktail(id)
                    } else return of(null)
                })
            )
            .subscribe((value) => {
                if (value) {
                    this.cocktail = value
                    this.trustedVideoSrc =
                        this.sanitizer.bypassSecurityTrustResourceUrl(
                            value.VideoEmbedUrl
                        )
                    this.cocktailImage = `${environment.assetsUrl}/images/1x1/${value.Image}`
                    this.updateHead(this.cocktail)
                } else {
                    this.router.navigate(["/"])
                }
            })
        this.subscriptions.add(routeSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        this.script.remove()
        this.meta.removeTag("name=description")
    }

    updateHead(cocktail: Cocktail): void {
        this.title.setTitle(this.cocktail.Title)
        this.meta.addTag({
            name: "description",
            content: this.cocktail.Description,
        })
        const recipe: Recipe = {
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: cocktail.RecipeName,
            image: [
                `${environment.assetsUrl}/images/1x1/${cocktail.Image}`,
                `${environment.assetsUrl}/images/4x3/${cocktail.Image}`,
                `${environment.assetsUrl}/images/16x9/${cocktail.Image}`,
            ],
            author: {
                "@type": "Person",
                name: cocktail.Author,
            },
            datePublished: cocktail.PublishDate,
            description: cocktail.Description,
            prepTime: cocktail.PrepTime,
            cookTime: cocktail.CookTime,
            totalTime: cocktail.TotalTime,
            keywords: cocktail.Keywords,
            recipeCuisine: cocktail.RecipeCuisine,
            recipeYield: cocktail.RecipeYield,
            recipeCategory: cocktail.RecipeCategory,
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: cocktail.RatingValue,
                ratingCount: cocktail.RatingCount,
            },
            nutrition: {
                "@type": "NutritionInformation",
                calories: `${cocktail.Calories} calories`,
            },
            recipeIngredient: cocktail.RecipeIngredient,
            recipeInstructions: [],
        }

        cocktail.RecipeInstructions.forEach((instruction) => {
            recipe.recipeInstructions?.push({
                "@type": "HowToStep",
                name: instruction.StepName,
                text: instruction.StepDescription,
            })
        })

        if (cocktail.VideoEmbedUrl) {
            recipe.video = {
                "@type": "VideoObject",
                name: cocktail.VideoName,
                uploadDate: cocktail.VideoUploadDate,
                thumbnailUrl: cocktail.VideoThumbnailUrl,
                description: cocktail.VideoDescription,
                contentUrl: cocktail.VideoContentUrl,
                embedUrl: cocktail.VideoEmbedUrl,
            }
        }
        this.script.type = "application/ld+json"
        this.script.text = JSON.stringify(recipe)
        this._document.head.appendChild(this.script)
    }
}
