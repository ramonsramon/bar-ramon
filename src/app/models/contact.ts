import { FormControl } from "@angular/forms"

export type Contact = {
    email: string | null
}

export type ContactForm = {
    email: FormControl<string | null>
}
