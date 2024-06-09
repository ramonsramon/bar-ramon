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
    setDoc,
} from "@angular/fire/firestore"
import { Observable } from "rxjs"
import { Cocktail } from "./models/cocktail"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Contact } from "./models/contact"
import { environment } from "src/environments/environment"
import {
    Auth,
    User,
    UserCredential,
    signInWithEmailAndPassword,
    signOut,
    user,
} from "@angular/fire/auth"
import { Creds } from "./models/creds"

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

    constructor(
        private firestore: Firestore,
        private http: HttpClient,
        private auth: Auth
    ) {}

    /**
     * Gets a Computed Signal of filtered cocktails that is dependent on totalCocktails and the filter function
     *
     * The default filter function is the same as the totalCocktails
     *
     * @return A Computed Signal of a Cocktail array
     **/
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

    /**
     * Gets an observable of a single Cocktail
     *
     * @return An Observable that contains a single Cocktail
     **/
    getCocktail(id: string): Observable<Cocktail> {
        const cocktailDocument = doc(
            this.firestore,
            `${this.cocktailPath}/${id}`
        )
        return docData(cocktailDocument) as Observable<Cocktail>
    }

    addUpdateCocktail(cocktail: Cocktail) {
        let id = cocktail.RecipeName.replaceAll(" ", "-").toLowerCase()
        const cocktailCollection = doc(
            this.firestore,
            `${this.cocktailPath}/${id}`
        )
        setDoc(cocktailCollection, cocktail).then((d) => {
            console.log(d)
        })
    }

    /**
     * Updates Writeable Signal FilterFunction with new filter
     *
     * @param filterFunction a function to filter the totalCocktail array
     *
     * @return Void
     **/
    updateFilter(
        filterFunc: (
            value: Cocktail,
            index: number,
            array: Cocktail[]
        ) => boolean
    ) {
        this.filterFunction.set(filterFunc)
    }

    /**
     * Adds subscriber to the Bar Ramon Contact list and sends a welcome email
     *
     * @param contact Email address of the subscriber
     *
     * @return An observable of the http response with body and headers
     **/
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

    login(creds: Creds): Promise<UserCredential> {
        return signInWithEmailAndPassword(
            this.auth,
            creds.email,
            creds.password
        )
    }

    logout(): Promise<void> {
        return signOut(this.auth)
    }

    getUser(): Observable<User | null> {
        return user(this.auth)
    }
}
