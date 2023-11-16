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
import { HomePageComponent } from "./app/home-page/home-page.component"
import { CocktailPageComponent } from "./app/cocktail-page/cocktail-page.component"

const routes: Routes = [
    { component: HomePageComponent, path: "" },
    { component: CocktailPageComponent, path: "cocktails/:id" },
    { component: HomePageComponent, path: "**" },
]

export default () =>
    bootstrapApplication(AppComponent, {
        providers: [
            BarRamonService,
            provideHttpClient(withFetch()),
            provideClientHydration(),
            importProvidersFrom(
                provideFirebaseApp(() => initializeApp(environment.firebase))
            ),
            importProvidersFrom(
                provideFirestore(() =>
                    getFirestore(getApp(), environment.databaseId)
                )
            ),
            importProvidersFrom(provideAnalytics(() => getAnalytics())),
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
