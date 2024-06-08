import { FormArray, FormControl, FormGroup } from "@angular/forms"

export type Cocktail = {
    Author: string
    Title: string
    Description: string
    PublishDate: string
    RawIngredients: string
    RecipeName: string
    PrimarySpirit: string
    Image: string
    ImageAlt: string
    PrepTime: string
    CookTime: string
    TotalTime: string
    Keywords: string
    RatingValue: number
    RatingCount: number
    RecipeGlass: string
    RecipeYield: number
    RecipeCategory: string
    RecipeCuisine: string
    RecipeIngredient: string[]
    RecipeInstructions: Step[]
    Calories: number
    VideoName: string
    VideoDescription: string
    VideoContentUrl: string
    VideoEmbedUrl: string
    VideoUploadDate: string
    VideoThumbnailUrl: string
    VideoWidth: number
    VideoHeight: number
}

export type Step = {
    StepName: string
    StepDescription: string
}

export const EMPTY_COCKTAIL: Cocktail = {
    Author: "",
    Title: "",
    Description: "",
    PublishDate: "",
    RawIngredients: "",
    RecipeName: "",
    PrimarySpirit: "",
    Image: "",
    ImageAlt: "",
    PrepTime: "",
    CookTime: "",
    TotalTime: "",
    Keywords: "",
    RatingValue: 0,
    RatingCount: 0,
    RecipeGlass: "",
    RecipeYield: 0,
    RecipeCategory: "",
    RecipeCuisine: "",
    RecipeIngredient: [],
    RecipeInstructions: [],
    Calories: 0,
    VideoName: "",
    VideoDescription: "",
    VideoContentUrl: "",
    VideoEmbedUrl: "",
    VideoUploadDate: "",
    VideoThumbnailUrl: "",
    VideoWidth: 0,
    VideoHeight: 0,
}

export type CocktailFormGroup = {
    Author: FormControl<string | null>
    Title: FormControl<string | null>
    Description: FormControl<string | null>
    PublishDate: FormControl<string | null>
    RawIngredients: FormControl<string | null>
    RecipeName: FormControl<string | null>
    PrimarySpirit: FormControl<string | null>
    Image: FormControl<string | null>
    ImageAlt: FormControl<string | null>
    PrepTime: FormControl<string | null>
    CookTime: FormControl<string | null>
    TotalTime: FormControl<string | null>
    Keywords: FormControl<string | null>
    RatingValue: FormControl<number | null>
    RatingCount: FormControl<string | null>
    RecipeGlass: FormControl<string | null>
    RecipeYield: FormControl<number | null>
    RecipeCategory: FormControl<string | null>
    RecipeCuisine: FormControl<string | null>
    RecipeIngredient: FormArray<FormControl<string | null>>
    RecipeInstructions: FormArray<FormGroup<StepFormGroup>>
    Calories: FormControl<number | null>
    VideoName: FormControl<string | null>
    VideoDescription: FormControl<string | null>
    VideoContentUrl: FormControl<string | null>
    VideoEmbedUrl: FormControl<string | null>
    VideoUploadDate: FormControl<string | null>
    VideoThumbnailUrl: FormControl<string | null>
    VideoWidth: FormControl<number | null>
    VideoHeight: FormControl<number | null>
}

export type StepFormGroup = {
    StepName: FormControl<string | null>
    StepDescription: FormControl<string | null>
}

export const DEFAULT_COCKTAIL_FORM: CocktailFormGroup = {
    Author: new FormControl("Ramon Ramon"),
    Title: new FormControl(""),
    Description: new FormControl(""),
    PublishDate: new FormControl(""),
    RawIngredients: new FormControl(""),
    RecipeName: new FormControl(""),
    PrimarySpirit: new FormControl(""),
    Image: new FormControl(""),
    ImageAlt: new FormControl(""),
    PrepTime: new FormControl(""),
    CookTime: new FormControl(""),
    TotalTime: new FormControl(""),
    Keywords: new FormControl(""),
    RatingValue: new FormControl(5),
    RatingCount: new FormControl("1"),
    RecipeGlass: new FormControl(""),
    RecipeYield: new FormControl(0),
    RecipeCategory: new FormControl("Drink"),
    RecipeCuisine: new FormControl("American"),
    RecipeIngredient: new FormArray([new FormControl("")]),
    RecipeInstructions: new FormArray([
        new FormGroup({
            StepName: new FormControl("Chill glassware"),
            StepDescription: new FormControl(
                "Place glass into freezer before preparing the cocktail"
            ),
        }),
        new FormGroup({
            StepName: new FormControl("Add ingredients"),
            StepDescription: new FormControl(
                "All all ingredients to large side of the Boston Shaker"
            ),
        }),
        new FormGroup({
            StepName: new FormControl("Add ice"),
            StepDescription: new FormControl(
                "Fill small side of Boston Shaker with ice"
            ),
        }),
        new FormGroup({
            StepName: new FormControl("Wet shake"),
            StepDescription: new FormControl("Shake for 30 seconds"),
        }),
        new FormGroup({
            StepName: new FormControl("Strain"),
            StepDescription: new FormControl(
                "Remove small side of the Boston Shaker and strain drink from larger side into the smaller side of the Boston Shaker"
            ),
        }),
        new FormGroup({
            StepName: new FormControl("Prep for shake"),
            StepDescription: new FormControl(
                "Dump the ice from the larger side of the Boston Shaker and place the small side onto the larger side"
            ),
        }),
        new FormGroup({
            StepName: new FormControl("Dry shake"),
            StepDescription: new FormControl("Shake for 15 seconds"),
        }),
        new FormGroup({
            StepName: new FormControl("Serve"),
            StepDescription: new FormControl(
                "Double strain into glass using the Hawthorne strainer and fine mesh strainer"
            ),
        }),
    ]),
    Calories: new FormControl(0),
    VideoName: new FormControl(""),
    VideoDescription: new FormControl(""),
    VideoContentUrl: new FormControl(""),
    VideoEmbedUrl: new FormControl(""),
    VideoUploadDate: new FormControl(""),
    VideoThumbnailUrl: new FormControl(""),
    VideoWidth: new FormControl(560),
    VideoHeight: new FormControl(315),
}
