import { provideHttpClient, withFetch } from "@angular/common/http"
import { BarRamonService } from "./bar-ramon.service"
import { provideFirebaseApp } from "@angular/fire/app"
import { getApp, initializeApp } from "firebase/app"
import { environment } from "src/environments/environment"
import { provideFirestore } from "@angular/fire/firestore"
import { initializeFirestore, persistentLocalCache } from "firebase/firestore"
import { provideAnalytics } from "@angular/fire/analytics"
import { getAnalytics } from "firebase/analytics"
import { provideAuth } from "@angular/fire/auth"
import { getAuth } from "firebase/auth"
import { provideAnimations } from "@angular/platform-browser/animations"
import { importProvidersFrom, isDevMode } from "@angular/core"
import { ServiceWorkerModule } from "@angular/service-worker"
import { provideRouter } from "@angular/router"
import { routes } from "./app.routes"
import { provideClientHydration } from "@angular/platform-browser"

export const appConfig = {
    providers: [
        BarRamonService,
        provideHttpClient(withFetch()),
        provideClientHydration(),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() =>
            initializeFirestore(
                getApp(),
                { localCache: persistentLocalCache({}) },
                environment.databaseId
            )
        ),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideAnimations(),
        importProvidersFrom(
            ServiceWorkerModule.register("ngsw-worker.js", {
                enabled: !isDevMode(),
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: "registerWhenStable:30000",
            })
        ),
        provideRouter(routes),
    ],
}
