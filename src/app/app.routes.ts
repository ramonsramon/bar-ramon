import { Routes } from "@angular/router"
import { authGuard } from "./auth.guard"

export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./home-page/home-page.component").then(
                (mod) => mod.HomePageComponent
            ),
    },
    {
        path: "cocktails/:id",
        loadComponent: () =>
            import("./cocktail-page/cocktail-page.component").then(
                (mod) => mod.CocktailPageComponent
            ),
    },
    {
        path: "login",
        loadComponent: () =>
            import("./login/login.component").then((mod) => mod.LoginComponent),
    },
    {
        path: "create/cocktail",
        canActivate: [authGuard],
        loadComponent: () =>
            import("./create-cocktail/create-cocktail.component").then(
                (mod) => mod.CreateCocktailComponent
            ),
    },
    {
        path: "**",
        loadComponent: () =>
            import("./home-page/home-page.component").then(
                (mod) => mod.HomePageComponent
            ),
    },
]
