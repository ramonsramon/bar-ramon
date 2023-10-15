import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { CocktailPageComponent } from "./cocktail-page/cocktail-page.component"
import { HomePageComponent } from "./home-page/home-page.component"

const routes: Routes = [
    { component: HomePageComponent, path: "" },
    { component: CocktailPageComponent, path: "cocktails/:id" },
    { component: HomePageComponent, path: "**" },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: "enabledBlocking",
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
