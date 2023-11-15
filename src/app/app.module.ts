import { NgModule, isDevMode } from "@angular/core"
import {
    BrowserModule,
    provideClientHydration,
} from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomePageComponent } from "./home-page/home-page.component"
import { environment } from "src/environments/environment"
import { getApp, initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { provideAnalytics, getAnalytics } from "@angular/fire/analytics"
import { CocktailPageComponent } from "./cocktail-page/cocktail-page.component"
import { BarRamonService } from "./bar-ramon.service"
import { CocktailCardComponent } from "./cocktail-card/cocktail-card.component"
import { CocktailListComponent } from "./cocktail-list/cocktail-list.component"
import { BubbleComponent } from "./bubble/bubble.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatIconModule } from "@angular/material/icon"
import { RatingComponent } from "./rating/rating.component"
import { MoreInfoComponent } from "./more-info/more-info.component"
import { MatButtonModule } from "@angular/material/button"
import { ReactiveFormsModule } from "@angular/forms"
import { RecipeTimePipe } from "./recipe-time.pipe"
import { NavbarComponent } from "./navbar/navbar.component"
import { ServiceWorkerModule } from "@angular/service-worker"
import { PagerComponent } from "./pager/pager.component"
import { provideHttpClient, withFetch } from "@angular/common/http"
import { FooterComponent } from "./footer/footer.component"

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        CocktailPageComponent,
        CocktailCardComponent,
        CocktailListComponent,
        BubbleComponent,
        RatingComponent,
        MoreInfoComponent,
        RecipeTimePipe,
        NavbarComponent,
        PagerComponent,
        FooterComponent,
    ],
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore(getApp(), environment.databaseId)),
        provideAnalytics(() => getAnalytics()),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000",
        }),
    ],
    providers: [
        BarRamonService,
        provideHttpClient(withFetch()),
        provideClientHydration(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
