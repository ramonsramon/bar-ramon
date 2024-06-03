import { Component } from "@angular/core"
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { BarRamonService } from "../bar-ramon.service"
import { Creds } from "../models/creds"
import { Router } from "@angular/router"

type SignInForm = {
    email: FormControl<string | null>
    password: FormControl<string | null>
}

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent {
    signInForm: FormGroup<SignInForm>
    creds: Creds

    constructor(
        private router: Router,
        private barRamonService: BarRamonService
    ) {
        this.signInForm = new FormGroup({
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        })
        this.creds = { email: "", password: "" }
    }

    signIn(): void {
        if (this.signInForm.value.email && this.signInForm.value.password) {
            this.creds = {
                email: this.signInForm.value.email,
                password: this.signInForm.value.password,
            }
            this.barRamonService
                .login(this.creds)
                .then(() => {
                    this.router.navigate([""])
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
