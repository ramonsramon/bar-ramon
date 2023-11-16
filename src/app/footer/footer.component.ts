import { Component } from "@angular/core"
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms"
import { ContactForm } from "../models/contact"
import { BarRamonService } from "../bar-ramon.service"
import { MatIconModule } from "@angular/material/icon"

@Component({
    selector: "footer",
    standalone: true,
    imports: [MatIconModule, ReactiveFormsModule],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.css",
})
export class FooterComponent {
    newSubForm: FormGroup<ContactForm>

    constructor(private barRamonService: BarRamonService) {
        this.newSubForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
        })
    }

    submit() {
        this.barRamonService
            .addSubscriber(this.newSubForm.getRawValue())
            .subscribe((res) => {
                if (res.status === 200) {
                    this.newSubForm.reset()
                } else {
                    console.log(res)
                }
            })
    }
}
