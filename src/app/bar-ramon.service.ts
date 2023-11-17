import {
    Injectable,
    Signal,
    WritableSignal,
    computed,
    signal,
} from "@angular/core"
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
    totalCocktails: WritableSignal<Cocktail[]> = signal([])
    filterFunction: WritableSignal<
        (value: Cocktail, index: number, array: Cocktail[]) => boolean
    > = signal(() => {
        return true
    })
    filteredCocktails: Signal<Cocktail[]> = computed(() =>
        this.totalCocktails().filter((value, index, array) =>
            this.filterFunction()(value, index, array)
        )
    )

    constructor(private firestore: Firestore, private http: HttpClient) {}

    getCocktails(): Signal<Cocktail[]> {
        const cocktailsCollection = collection(
            this.firestore,
            this.cocktailPath
        )
        const cocktails = collectionData(cocktailsCollection) as Observable<
            Cocktail[]
        >
        cocktails.subscribe((cocktailList) => {
            this.totalCocktails.set(cocktailList)
        })

        return this.filteredCocktails
    }

    getCocktail(id: string): Observable<Cocktail> {
        const cocktailDocument = doc(
            this.firestore,
            `${this.cocktailPath}/${id}`
        )
        return docData(cocktailDocument) as Observable<Cocktail>
    }

    updateFilter(
        filterFunc: (
            value: Cocktail,
            index: number,
            array: Cocktail[]
        ) => boolean
    ) {
        this.filterFunction.set(filterFunc)
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
