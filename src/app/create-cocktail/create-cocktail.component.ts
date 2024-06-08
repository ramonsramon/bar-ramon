import { Component } from "@angular/core"
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import {
    CocktailFormGroup,
    DEFAULT_COCKTAIL_FORM,
    StepFormGroup,
} from "../models/cocktail"

@Component({
    selector: "app-create-cocktail",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: "./create-cocktail.component.html",
    styleUrl: "./create-cocktail.component.css",
})
export class CreateCocktailComponent {
    createCocktailForm: FormGroup<CocktailFormGroup>

    constructor() {
        this.createCocktailForm = new FormGroup(DEFAULT_COCKTAIL_FORM)
    }

    get RecipeIngredient(): FormArray<FormControl<string | null>> {
        return this.createCocktailForm.get("RecipeIngredient") as FormArray<
            FormControl<string | null>
        >
    }

    get RecipeInstructions(): FormArray<FormGroup<StepFormGroup>> {
        return this.createCocktailForm.get("RecipeInstructions") as FormArray<
            FormGroup<StepFormGroup>
        >
    }

    submit() {
        console.log(this.createCocktailForm.value)
    }
}
