import { Component, Input } from "@angular/core"

@Component({
    selector: "more-info",
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
