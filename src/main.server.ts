import {
    bootstrapApplication,
    provideClientHydration,
} from "@angular/platform-browser"
import { AppComponent } from "./app/app.component"
import { BarRamonService } from "./app/bar-ramon.service"
import { provideHttpClient, withFetch } from "@angular/common/http"
import { getApp, provideFirebaseApp } from "@angular/fire/app"
import { initializeApp } from "firebase/app"
import { environment } from "./environments/environment"
import { importProvidersFrom, isDevMode } from "@angular/core"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { getAnalytics, provideAnalytics } from "@angular/fire/analytics"
import { ServiceWorkerModule } from "@angular/service-worker"
import {
    Routes,
    provideRouter,
    withEnabledBlockingInitialNavigation,
} from "@angular/router"

const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./app/home-page/home-page.component").then(
                (mod) => mod.HomePageComponent
            ),
    },
    {
        path: "cocktails/:id",
        loadComponent: () =>
            import("./app/cocktail-page/cocktail-page.component").then(
                (mod) => mod.CocktailPageComponent
            ),
    },
    {
        path: "**",
        loadComponent: () =>
            import("./app/home-page/home-page.component").then(
                (mod) => mod.HomePageComponent
            ),
    },
]

export default () =>
    bootstrapApplication(AppComponent, {
        providers: [
            BarRamonService,
            provideHttpClient(withFetch()),
            provideClientHydration(),
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideFirestore(() =>
                getFirestore(getApp(), environment.databaseId)
            ),
            provideAnalytics(() => getAnalytics()),
            importProvidersFrom(
                ServiceWorkerModule.register("ngsw-worker.js", {
                    enabled: !isDevMode(),
                    // Register the ServiceWorker as soon as the application is stable
                    // or after 30 seconds (whichever comes first).
                    registrationStrategy: "registerWhenStable:30000",
                })
            ),
            provideRouter(routes, withEnabledBlockingInitialNavigation()),
        ],
    })
