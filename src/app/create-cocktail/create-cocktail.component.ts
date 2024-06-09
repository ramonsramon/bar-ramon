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
import { MatDividerModule } from "@angular/material/divider"
import { MatIconModule } from "@angular/material/icon"
import {
    Cocktail,
    CocktailFormGroup,
    DEFAULT_COCKTAIL_FORM,
    StepFormGroup,
} from "../models/cocktail"
import { BarRamonService } from "../bar-ramon.service"

@Component({
    selector: "app-create-cocktail",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
    ],
    templateUrl: "./create-cocktail.component.html",
    styleUrl: "./create-cocktail.component.css",
})
export class CreateCocktailComponent {
    createCocktailForm: FormGroup<CocktailFormGroup>

    constructor(private barRamonService: BarRamonService) {
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

    AddRemoveIngredient(e: MouseEvent, add: boolean) {
        e.preventDefault()
        if (add) {
            this.RecipeIngredient.push(new FormControl(""))
        } else {
            if (this.RecipeIngredient.controls.length > 0) {
                this.RecipeIngredient.removeAt(this.RecipeIngredient.length - 1)
            }
        }
    }

    AddRemoveInstruction(e: MouseEvent, add: boolean) {
        e.preventDefault()
        if (add) {
            this.RecipeInstructions.push(
                new FormGroup({
                    StepName: new FormControl(""),
                    StepDescription: new FormControl(""),
                })
            )
        } else {
            if (this.RecipeInstructions.length > 0) {
                this.RecipeInstructions.removeAt(
                    this.RecipeInstructions.length - 1
                )
            }
        }
    }

    submit() {
        let cocktail = Object.assign({}, this.createCocktailForm.value)
        if (cocktail.RecipeName) {
            if (cocktail.PrepTime) {
                let totalTime =
                    Number(cocktail.PrepTime) + Number(cocktail.CookTime)
                cocktail.TotalTime = "PT" + String(totalTime) + "M"
            }

            cocktail.CookTime = cocktail.CookTime
                ? "PT" + String(cocktail.CookTime) + "M"
                : ""
            cocktail.PrepTime = cocktail.PrepTime
                ? "PT" + String(cocktail.PrepTime) + "M"
                : ""
            cocktail.Title = "How to make a " + cocktail.RecipeName
            cocktail.VideoUploadDate = cocktail.VideoUploadDate
                ? cocktail.VideoUploadDate + ":00+08:00"
                : ""
            let now = new Date()
            let fullYear = now.getFullYear().toString()
            let month = now.getMonth().toString()
            let date = now.getDate().toString()
            cocktail.PublishDate = `${fullYear}-${
                month.length > 1 ? month : "0" + month
            }-${date.length > 1 ? date : "0" + date}`
            this.barRamonService
                .addUpdateCocktail(cocktail as Cocktail)
                .then(() => {
                    console.log("Cocktail Create/Update Succesfully")
                })
                .catch((err) => {
                    console.error("Issue creating/updating cocktail", err)
                })
        }
    }
}
