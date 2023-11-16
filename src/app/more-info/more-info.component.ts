import { Component, Input } from "@angular/core"
import { RatingComponent } from "../rating/rating.component"
import { RecipeTimePipe } from "../recipe-time.pipe"
import { NgClass } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"

@Component({
    selector: "more-info",
    standalone: true,
    imports: [RatingComponent, NgClass, RecipeTimePipe, MatButtonModule],
    templateUrl: "./more-info.component.html",
    styleUrls: ["./more-info.component.css"],
})
export class MoreInfoComponent {
    @Input() rating = 0
    @Input() servingSize = 0
    @Input() prepTime = ""
    @Input() cookTime = ""
    @Input() totalTime = ""
    @Input() calories = 0
    @Input() description = ""
    isHidden = true
    buttonText = "More Info"

    constructor() {}

    toggleIsHidden() {
        this.isHidden = !this.isHidden
        this.buttonText = this.isHidden ? "More Info" : "Hide Info"
    }
}
