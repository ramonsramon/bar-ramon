import { Injectable } from "@angular/core"
import {
    Firestore,
    collectionData,
    collection,
    doc,
    docData,
} from "@angular/fire/firestore"
import { Observable } from "rxjs"
import { Cocktail } from "./models/cocktail"

@Injectable({
    providedIn: "root",
})
export class BarRamonService {
    cocktailPath = "cocktails"

    constructor(private firestore: Firestore) {}

    getCocktails(): Observable<Cocktail[]> {
        const cocktailsCollection = collection(
            this.firestore,
            this.cocktailPath
        )
        return collectionData(cocktailsCollection) as Observable<Cocktail[]>
    }

    getCocktail(id: string): Observable<Cocktail> {
        const cocktailDocument = doc(
            this.firestore,
            `${this.cocktailPath}/${id}`
        )
        return docData(cocktailDocument) as Observable<Cocktail>
    }
}
