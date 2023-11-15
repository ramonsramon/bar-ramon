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
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Contact } from "./models/contact"
import { environment } from "src/environments/environment"

@Injectable({
    providedIn: "root",
})
export class BarRamonService {
    cocktailPath = "cocktails"

    constructor(private firestore: Firestore, private http: HttpClient) {}

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

    addSubscriber(contact: Contact): Observable<HttpResponse<string>> {
        return this.http.post(
            `${environment.emailServiceUrl}/contact`,
            contact,
            {
                responseType: "text",
                observe: "response",
            }
        )
    }
}
