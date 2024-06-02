import { ApplicationConfig, mergeApplicationConfig } from "@angular/core"
import { provideServerRendering } from "@angular/platform-server"
import { appConfig } from "./app.config"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { getApp } from "@angular/fire/app"
import { environment } from "src/environments/environment"

const serverConfig: ApplicationConfig = {
    providers: [
        provideServerRendering(),
        provideFirestore(() => getFirestore(getApp(), environment.databaseId)),
    ],
}

export const config = mergeApplicationConfig(appConfig, serverConfig)
