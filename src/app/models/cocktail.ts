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
