import { Component } from "@angular/core"
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms"
import { ContactForm } from "../models/contact"
import { BarRamonService } from "../bar-ramon.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatIconModule } from "@angular/material/icon"
import { RouterLink } from "@angular/router"
import { Observable, catchError, of } from "rxjs"
import { HttpResponse } from "@angular/common/http"

@Component({
    selector: "footer",
    standalone: true,
    imports: [
        MatIconModule,
        ReactiveFormsModule,
        RouterLink,
        MatProgressSpinnerModule,
    ],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.css",
})
export class FooterComponent {
    newSubForm: FormGroup<ContactForm>
    isLoading: boolean = false
    isSuccess: boolean = false
    isFailure: boolean = false

    constructor(private barRamonService: BarRamonService) {
        this.newSubForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
        })
    }

    submit() {
        this.isLoading = !this.isLoading
        this.barRamonService
            .addSubscriber(this.newSubForm.getRawValue())
            .pipe(
                catchError((err) => {
                    return of(err) as Observable<HttpResponse<string>>
                })
            )
            .subscribe((res) => {
                this.isLoading = !this.isLoading
                if (res.status === 200 || res.status === 409) {
                    this.isSuccess = true
                    this.isFailure = false
                } else {
                    console.log(res)
                    this.isSuccess = false
                    this.isFailure = true
                }
            })
    }
}
