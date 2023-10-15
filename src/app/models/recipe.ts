export type Recipe = {
    "@context": string
    "@type": string
    name: string
    image: string[]
    author?: Author
    datePublished?: string
    description?: string
    prepTime?: string
    cookTime?: string
    totalTime?: string
    keywords?: string
    recipeCuisine?: string
    recipeYield?: number
    recipeCategory?: string
    aggregateRating?: AggregateRating
    video?: Video
    nutrition?: Nutrition
    recipeIngredient?: string[]
    recipeInstructions?: Instruction[]
}

type Author = {
    "@type": string
    name: string
}

type AggregateRating = {
    "@type": string
    ratingValue: number
    ratingCount: number
}

type Video = {
    "@type": string
    name: string
    uploadDate: string
    thumbnailUrl: string
    description: string
    contentUrl: string
    embedUrl: string
}

type Nutrition = {
    "@type": string
    calories: string
}

type Instruction = {
    "@type": string
    name: string
    text: string
}
